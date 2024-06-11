import { Component, OnInit, inject } from '@angular/core';
import { Proveedor } from '../core/models/proveedor.model';
import { ProveedoresService } from '../core/Service/proveedores.service';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';



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
  private readonly formBuilder = inject(FormBuilder);

  nuevoProveedorForm = this.formBuilder.nonNullable.group({
    codigo: ['', Validators.required],
    proveedor: ['', Validators.required],
    cuit:['', [Validators.required, Validators.maxLength(11), Validators.minLength(11) ]],
    domicilio: ['', Validators.required],
    condicionIva: ['', Validators.required]
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

  onClickProveedor():void{
    //console.log(this.nuevoProveedorForm.get('cuit')?.value) para versiones de Angular de 14 hacia abajo
    const cuit = this.nuevoProveedorForm.controls.cuit.value
    
    console.log("numero de Cuit " + cuit)
    console.log("Cuit Valido?  " + this.nuevoProveedorForm.controls.cuit.valid)
    console.log("formulario valido?? " + this.nuevoProveedorForm.valid)
  }

  setCodigo():void{
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
    return this.nuevoProveedorForm.controls.proveedor
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
