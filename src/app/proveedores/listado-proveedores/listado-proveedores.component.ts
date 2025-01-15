import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Proveedor } from '../../core/models/proveedor.model';
import { ProveedoresService } from '../../core/Service/proveedores.service';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TableComponent } from '../../component/table/table.component';
import { Modal } from 'bootstrap';
import { FacturasService } from '../../core/Service/facturas.service';


@Component({
  selector: 'app-listado-proveedores',
  standalone: true,
  imports: [HttpClientModule, DataTablesModule, ReactiveFormsModule, NgClass, TableComponent],
  templateUrl: './listado-proveedores.component.html',
  styleUrl: './listado-proveedores.component.css'
})
export class ListadoProveedoresComponent {

  modalTarget: string = '#proveedorModal'
  titulosTabla: { key: string, label: string }[] = [
    { key: 'codigo', label: 'Código' },
    { key: 'razonSocial', label: 'Razón Social' },
    { key: 'cuit', label: 'CUIT' },
    { key: 'domicilio', label: 'Domicilio' },
    { key: 'condicionIva', label: 'Condición IVA' },    
  ];

  dtoptions: any = {};
  dtTrigger:Subject<any> = new Subject<any>();
  proveedores: Proveedor[] = []; 
  registrar: Boolean = false;
  actualizar: Boolean = false;
  @ViewChild('proveedorModal') proveedorModal!: ElementRef;
  
  

  private proveedorService = inject(ProveedoresService);
  private facturasService = inject(FacturasService);
  private formBuilder = inject(FormBuilder);

  nuevoProveedorForm = this.formBuilder.nonNullable.group({
    id: [''],
    codigo: ['', [Validators.required]],
    razonSocial: ['', [Validators.required]],
    cuit:['', [Validators.required, Validators.maxLength(11), Validators.minLength(11) ]],
    domicilio: ['', [Validators.required]],
    condicionIva: ['', [Validators.required]]
  });  
  
  
  ngOnInit(): void {    
    // Llama al método para obtener los proveedores al inicializar el componente
    this.getProveedores();        
  }

  private getProveedores():void{
    this.proveedorService.listadoProveedores().subscribe(data => {
      this.proveedores = data;      
    });      
  }  
  
  registrarProveedor(){
    let nuevoProveedor: Proveedor = this.nuevoProveedorForm.value as Proveedor;
    //console.log('Nuevo proveedor:', JSON.stringify(nuevoProveedor)); //para ver el JSON de una variable por consola    
    
    if (this.nuevoProveedorForm.controls.id.value === ''){
      delete nuevoProveedor.id;  

      if(this.nuevoProveedorForm.valid){
        this.proveedorService.registrarProveedor(nuevoProveedor).subscribe(
          (nuevoProveedor: Proveedor) => {            
           this.proveedores.push(nuevoProveedor);                  
            console.log('Proveedor registrado: ', nuevoProveedor)
          },
          error => {
            console.error('Error registrando el proveedor: ', error)
          }
        );
      }
    }else if(this.nuevoProveedorForm.valid){
      this.proveedorService.modificarProveedor(nuevoProveedor).subscribe(
        () => {          
          this.getProveedores()
        }
      );
      console.log('Actualizacion realizada');
    }else{
      console.log('revisar los campos que no cumplen, no se actualiza proveedor')
    }
  }

  editarProveedor(indice: number){
    let proveedor: Proveedor = this.proveedores[indice];
    this.loadForm(proveedor)
    //console.log(JSON.stringify(this.nuevoProveedorForm.value))
  }
  
   
  private setCodigo():void{
    if (this.nuevoProveedorForm.controls.id.value == ''){
      this.proveedorService.getNextCodigo().subscribe(
        nextCodigo => {
          this.nuevoProveedorForm.patchValue({codigo: nextCodigo.toString()});
        },
        error => {
          console.error('Error al obtener el último código: ', error);
        }
      );
    }
  }

  nuevoProveedorModal(): void{
    this.clearForm();
    this.setCodigo();
  }

  private clearForm(){
    this.nuevoProveedorForm.setValue({      
      id:'',
      codigo:'',
      razonSocial:'',
      cuit:'',
      domicilio:'',
      condicionIva:''       
    })
  }

  private loadForm(proveedor: Proveedor){
    this.nuevoProveedorForm.patchValue({
      id: proveedor.id ? proveedor.id.toString(): '',
      codigo: proveedor.codigo,
      razonSocial: proveedor.razonSocial,
      cuit: proveedor.cuit,
      domicilio: proveedor.domicilio, 
      condicionIva: proveedor.condicionIva
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

  abrirModalProveedor() {
    const modalElement = this.proveedorModal.nativeElement;
    const bootstrapModal = new Modal(modalElement);
    bootstrapModal.show();
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
