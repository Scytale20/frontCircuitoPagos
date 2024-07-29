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

  titulosTabla: string[] = ['Fecha', 'N° de OP', 'Proveedor', 'Concepto', 'Importe']
  ordenesPago: any[] = []

}
