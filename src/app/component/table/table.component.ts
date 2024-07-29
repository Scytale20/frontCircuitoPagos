import { Component, Input, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{

  dtoptions: any = {};
  dtTrigger:Subject<any> = new Subject<any>();
  
  @Input() titulosColumnas: string[] = [];
  @Input() datosTabla: any[] = [];


  ngOnInit(): void {
    this.dtoptions = {
      pagingType:'full_numbers',
      lengthMenu:[5, 10, 15, 20, 25],
      pageLength:10,
      order:[1, 'asc'],
      destroy: true, //para que pueda cargarse luego de hacer una modificacion, sin que se produzcan errores. 
      scrollY: '59vh',
      scrollColapse: true,
      autoWidth: false,
      language:{
        searchPlaceholder:'Ingrese Busqueda',
        search: "Buscar:",
        lengthMenu: "_MENU_ Registros",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      }

      //pageLength: 7,
      //paging: false,
      //ordering: false,
      //searching: false,
      //lengthChange:false      
    }
    this.dtTrigger.next(this.dtoptions);
  }

  ngOnDestroy(): void {
    // Desuscribir el Subject para evitar fugas de memoria
    this.dtTrigger.unsubscribe();
    
  }


}
