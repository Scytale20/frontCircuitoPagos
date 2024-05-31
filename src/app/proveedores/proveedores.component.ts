import { Component, OnInit, inject } from '@angular/core';
import { Proveedor } from '../core/models/proveedor.model';
import { ProveedoresService } from '../core/Service/proveedores.service';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { Subject } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [HttpClientModule, DataTablesModule, ReactiveFormsModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {

  dtoptions = {}
  dtTrigger:Subject<any> = new Subject<any>();
  proveedores: Proveedor[] = []


  nuevoProveedorForm = new FormGroup({
    codigo: new FormControl(''),
    proveedor: new FormControl(''),
    cuit: new FormControl('30716119951'),
    domicilio: new FormControl(''),
    condicionIva: new FormControl('')
  });

  private proveedorService = inject(ProveedoresService)
  
  
  
  ngOnInit(): void {
    this.dtoptions = {
      pagingType:'full_numbers'
    };
    this.getProveedores(); // Llama al método para obtener los proveedores al inicializar el componente
  }

  private getProveedores():void{
    this.proveedorService.getProveedores().subscribe(data => {
      this.proveedores = data;
      this.dtTrigger.next(null);      
    })
      
  }

  onClickProveedor():void{
    console.log(this.nuevoProveedorForm.get('cuit')?.value)
  }

}
