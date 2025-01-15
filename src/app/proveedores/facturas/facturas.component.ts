import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../../component/table/table.component';
import { DataTablesModule } from 'angular-datatables';
import { Factura } from '../../core/models/factura.model';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Proveedor } from '../../core/models/proveedor.model';
import { ProveedoresService } from '../../core/Service/proveedores.service';
import { DecimalPipe, NgClass } from '@angular/common';
import { ProveedoresComponent } from '../proveedores.component';
import { FacturasService } from '../../core/Service/facturas.service';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [TableComponent, DataTablesModule, ReactiveFormsModule, DecimalPipe, NgClass],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent{
  
  modalTarget: string = '#facturaModal'
  titulosTabla: { key: string, label: string }[] = [
    { key: 'fechaEmision', label: 'Emision' },
    { key: 'numeroFactura', label: 'Factura N°' },
    { key: 'concepto', label: 'Concepto' },
    { key: 'cantidad', label: 'Cantidad' },
    { key: 'precioUnitario', label: 'P. Unitario' },    
    { key: 'totalFactura', label: 'Total Factura' },    
    { key: 'estado', label: 'Estado' }    
  ];

  proveedores: Proveedor[] = [];
  facturas: Factura[] = []; 
  subtotal: number = 0;
  impuestos:number = 0;
  total: number = 0;
  registrar: Boolean = false;
  actualizar: Boolean = false;
  

  private formBuilder = inject(FormBuilder);
  private proveedorService = inject(ProveedoresService);
  private facturasService = inject(FacturasService);

  nuevaFacturaForm = this.formBuilder.nonNullable.group({
    id: ['null'],
    nombre:['null', [Validators.required]],
    cuit:['', [Validators.required]],
    fechaEmision:[new Date().toISOString().substring(0, 10)], 
    fechaVencimiento:[new Date().toISOString().substring(0, 10)],
    concepto:['', [Validators.required]],
    cantidad:[0, [Validators.required, Validators.min(1), Validators.max(999999)]],
    unidadMedida:['Un', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]], //para validar que sean solo letras
    precioUnitario:[0, [Validators.required, Validators.min(0.01), Validators.max(99999999)]],
    alicuotaIva:[21, [Validators.required]],
    subtotal:[0],
    totalFactura:[0, [Validators.required]],
    numeroFactura:['00001-00000000', [Validators.required, Validators.maxLength(14), Validators.minLength(13)]],
    letraFactura:['A', [Validators.required]],
    estado:['Pendiente']
  });

  proveedorFormDesdeFactura = this.formBuilder.nonNullable.group({
    id: [''],    
    razonSocial: ['', [Validators.required]],
    cuit:['', [Validators.required, Validators.maxLength(11), Validators.minLength(11) ]],    
    condicionIva: ['', [Validators.required]]
  });

  ngOnInit(): void{
    this.getProveedores();
    this.onFormValueChange();
    
  }

  private getProveedores():void{
    this.proveedorService.listadoProveedores().subscribe(data => {
      this.proveedores = data;      
    });      
  }  

  onFormValueChange(): void {
    this.nuevaFacturaForm.valueChanges.subscribe(
      values =>{
        const cantidad = values.cantidad ?? 0;
        const precioUnitario = values.precioUnitario ?? 0;
        const alicuotaIva = values.alicuotaIva ?? 0;

         this.subtotal = cantidad * precioUnitario;
         this.impuestos = this.subtotal * alicuotaIva/100;
         this.total = this.subtotal + this.impuestos;

        this.nuevaFacturaForm.patchValue({
          subtotal: parseFloat(this.subtotal.toFixed(2)),
          totalFactura: parseFloat(this.total.toFixed(2)) 
        }, {emitEvent: false});
      }
    )
  }
  

  onProveedorChange(event: any){
    //Trae los proveedores para el dropdown
    const selectedProveedor = this.proveedores.find(p => p.razonSocial === event.target.value);
    if(selectedProveedor){
      this.nuevaFacturaForm.patchValue({        
        cuit: selectedProveedor.cuit
      })
    }

  }

  registrarFactura(){    
    console.log(this.nuevaFacturaForm.value);
    this.clearForm();
    //TODO resolver los tipos de datos a enviar en el form, ya sea en este metodo o en otro parseFloat en caso de string a number
  }

  editarFactura(indice: number){
    let factura: Factura = this.facturas[indice];
    console.log("Aca va el Load Form");
    
    
  }

  nuevaFacturaModal(){
    
  }

  private clearForm(){
    this.nuevaFacturaForm.setValue({
      id: 'null',
      nombre: 'null',
      cuit: '',
      fechaEmision: new Date().toISOString().substring(0, 10),
      fechaVencimiento: new Date().toISOString().substring(0, 10),
      concepto: '',
      cantidad: 0,
      unidadMedida: 'Un',
      precioUnitario: 0,
      alicuotaIva: 21,
      subtotal: 0,
      totalFactura: 0,
      numeroFactura: '00001-00000000',
      letraFactura: 'A',
      estado: 'Pendiente'
    });
  } 

  botonRegistrar(){
    this.registrar = true;
    this.actualizar = false;
  }  
   botonActualizar(){
    this.registrar = false;
    this.actualizar = true;
  }

  registrarProveedorDesdeFactura(){
    console.log(this.proveedorFormDesdeFactura.value)
  }

  get proveedorField(): FormControl<string>{
    return this.nuevaFacturaForm.controls.nombre
  }
  get cantidadField(): FormControl<number>{
    return this.nuevaFacturaForm.controls.cantidad
  }
  get numeroFacturaField(): FormControl<string>{
      return this.nuevaFacturaForm.controls.numeroFactura
    }
  get conceptoField(): FormControl<string>{
      return this.nuevaFacturaForm.controls.concepto
    }
  get unidadField(): FormControl<string>{
      return this.nuevaFacturaForm.controls.unidadMedida
    }
  get precioField(): FormControl<number>{
      return this.nuevaFacturaForm.controls.precioUnitario
    }
  get impuestoField(): FormControl<number>{
      return this.nuevaFacturaForm.controls.alicuotaIva
    }
  
  get razonSocialField(): FormControl<string>{
      return this.proveedorFormDesdeFactura.controls.razonSocial
    }
  get cuitField(): FormControl<string>{
      return this.proveedorFormDesdeFactura.controls.cuit
    }
  get condicionIvaField(): FormControl<string>{
      return this.proveedorFormDesdeFactura.controls.condicionIva
    }

}
