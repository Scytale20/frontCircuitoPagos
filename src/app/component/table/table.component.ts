import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnDestroy{

  dtoptions: any = {};
  dtTrigger:Subject<any> = new Subject<any>();
  
  @Input() target!: string;
  @Input() titulosColumnas: { key: string, label: string }[] = [];
  @Input() datosTabla: any[] = [];

  @Output() traerNumero = new EventEmitter<void>();
  @Output() cambiarRegistrar = new EventEmitter<boolean>();
  @Output() cambiarActualizar = new EventEmitter<boolean>();
  @Output() editar = new EventEmitter<number>();
  



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
  }
    
  ngOnChanges(): void {
    if (this.datosTabla.length > 0) {
      this.dtTrigger.next(null);
    }
  } 

  ngOnDestroy(): void {
    // Desuscribir el Subject para evitar fugas de memoria
    this.dtTrigger.unsubscribe();    
  }

  onTraerNumero(){
    this.traerNumero.emit();
  }
  onCambiarBoton(){
    this.cambiarRegistrar.emit()
  }
  onEditar(index: any){
    this.editar.emit(index);
  }
  onCambiarActualiar(){
    this.cambiarActualizar.emit();
  }


}
