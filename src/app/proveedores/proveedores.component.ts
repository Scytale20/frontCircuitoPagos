import { Component, OnInit, inject } from '@angular/core';
import { Proveedor } from '../core/models/proveedor.model';
import { ProveedoresService } from '../core/Service/proveedores.service';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { error } from 'jquery';



@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [HttpClientModule, DataTablesModule, ReactiveFormsModule, NgClass],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {

  dtoptions = {}
  dtTrigger:Subject<any> = new Subject<any>();
  proveedores: Proveedor[] = [] 
  

  private proveedorService = inject(ProveedoresService);
  private formBuilder = inject(FormBuilder);

  nuevoProveedorForm = this.formBuilder.nonNullable.group({
    id: [null],
    codigo: ['', [Validators.required]],
    razonSocial: ['', [Validators.required]],
    cuit:['', [Validators.required, Validators.maxLength(11), Validators.minLength(11) ]],
    domicilio: ['', [Validators.required]],
    condicionIva: ['', [Validators.required]]
  });  
  
  
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

  registrarProveedor(){
    let nuevoProveedor: Proveedor = this.nuevoProveedorForm.value as Proveedor   

    console.log('Nuevo proveedor:', JSON.stringify(nuevoProveedor));

    if(this.nuevoProveedorForm.valid){
      this.proveedorService.registrarProveedor(nuevoProveedor).subscribe(
        response => {
          //this.proveedores.push(nuevoProveedor);
          console.log('Proveedor registrado: ', response)
        },
        error => {
          console.error('Error registrando el proveedor: ', error)
          
        }
      );
    }else{
      console.log('Formulario no valido');
    }
  }
  
  //console.log(this.nuevoProveedorForm.get('cuit')?.value) para versiones de Angular de 14 hacia abajo
  
  
  private setCodigo():void{
    this.proveedorService.getNextCodigo().subscribe(
      nextCodigo => {
        this.nuevoProveedorForm.patchValue({codigo: nextCodigo.toString()});
      },
      error => {
        console.error('Error al obtener el último código: ', error);
      }
    );
  }

  nuevoProveedorModal(): void{
    this.setCodigo();
  }

  get codigoField(): FormControl<string>{
    return this.nuevoProveedorForm.controls.codigo
  }
  get proveedorField(): FormControl<string>{
    return this.nuevoProveedorForm.controls.razonSocial
  }
  get cuitField(): FormControl<string>{
    return this.nuevoProveedorForm.controls.cuit
  }
  get domicilioField(): FormControl<string>{
    return this.nuevoProveedorForm.controls.domicilio
  }
  get condicionIvaField(): FormControl<string>{
    return this.nuevoProveedorForm.controls.condicionIva
  }

}
