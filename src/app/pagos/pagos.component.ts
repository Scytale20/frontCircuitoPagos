import { Component } from '@angular/core';
import { FormComponent } from '../component/form/form.component';
import { TableComponent } from '../component/table/table.component';
import { DataTablesModule } from 'angular-datatables';



@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [FormComponent, TableComponent, DataTablesModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {

  titulosTabla: { key: string, label: string }[] = [
    { key: 'fecha', label: 'Fecha' },
    { key: 'numeroDeOrden', label: 'N° de OP' },
    { key: 'proveedor', label: 'Proveedor' },
    { key: 'concepto', label: 'Concepto' },
    { key: 'importe', label: 'Importe' },    
  ];
  ordenesPago: any[] = ['30-07-2024', '2552', 'Lucas', 'Sarasa', '10']
  modalTarget: string = '#pagos'



  nuevoPagoModal() {
    console.log('Nuevo Proveedor Modal');
  }

  botonRegistrar() {
    console.log('Botón Registrar');
  }

}
