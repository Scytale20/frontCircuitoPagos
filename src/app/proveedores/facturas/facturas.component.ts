import { Component, inject } from '@angular/core';
import { TableComponent } from '../../component/table/table.component';
import { DataTablesModule } from 'angular-datatables';
import { Factura } from '../../core/models/factura.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [TableComponent, DataTablesModule, ReactiveFormsModule],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent {

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

  facturas: Factura[] = []; 
  registrar: Boolean = false;
  actualizar: Boolean = false;

  private formBuilder = inject(FormBuilder);

  nuevaFacturaForm = this.formBuilder.nonNullable.group({
    id: [''],
    proveedor:[''],
    fechaEmision:[''],
    fechaVencimiento:[''],
    descripcion:[''],
    cantidad:[''],
    unidadMedida:[''],
    precioUnitario:[''],
    alicuotaIva:[''],
    totalFactura:[''],
    numeroFactura:[''],
    letraFactura:[''],
  });

  

  registrarFactura(){

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
