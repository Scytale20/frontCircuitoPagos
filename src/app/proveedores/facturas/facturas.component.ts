import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../component/table/table.component';
import { DataTablesModule } from 'angular-datatables';
import { Factura } from '../../core/models/factura.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Proveedor } from '../../core/models/proveedor.model';
import { ProveedoresService } from '../../core/Service/proveedores.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [TableComponent, DataTablesModule, ReactiveFormsModule, DecimalPipe],
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

  nuevaFacturaForm = this.formBuilder.nonNullable.group({
    id: ['null'],
    nombre:['null'],
    cuit:[''],
    fechaEmision:[new Date().toISOString().substring(0, 10)], 
    fechaVencimiento:[new Date().toISOString().substring(0, 10)],
    descripcion:[''],
    cantidad:['0'],
    unidadMedida:['Un'],
    precioUnitario:['0'],
    alicuotaIva:['21'],
    totalFactura:['0'],
    numeroFactura:['00001-00000000'],
    letraFactura:['A'],
    estado:['Pendiente']
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
        const cantidad = parseFloat(values.cantidad ?? '0');
        const precioUnitario = parseFloat(values.precioUnitario ?? '0');
        const alicuotaIva = parseFloat(values.alicuotaIva ?? '0');

         this.subtotal = cantidad * precioUnitario;
         this.impuestos = this.subtotal * alicuotaIva/100;
         this.total = this.subtotal + this.impuestos;

        this.nuevaFacturaForm.patchValue({
          totalFactura: this.total.toFixed(2)
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
  }

  editarProveedor(indice: number){
    let factura: Factura = this.facturas[indice];
    console.log("Aca va el Load Form");
    
    
  }

  nuevaFacturaModal(){
    console.log("Aca va Clear form")
  }


  botonRegistrar(){
    this.registrar = true;
    this.actualizar = false;
  }  
   botonActualizar(){
    this.registrar = false;
    this.actualizar = true;
  }

}
