import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { Observable, Subject, tap } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private apiUrl = 'http://localhost:8080/proveedores'; // URL de la API
  private nuevoProveedorSubject = new Subject<Proveedor>(); //para comunicacion interna

  constructor(private http: HttpClient) { }

  listadoProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
}

registrarProveedor(proveedor: any): Observable<any>{
  return this.http.post<any>(`${this.apiUrl}/registrar`, proveedor);
}

modificarProveedor(proveedor: Proveedor):Observable<any>{
  return this.http.put<any>(`${this.apiUrl}/modificar`, proveedor);
}

getLastCodigo(): Observable<number>{
  return this.http.get<number>(`${this.apiUrl}/lastCodigo`);
}

getNextCodigo(): Observable<number>{
  return this.http.get<number>(`${this.apiUrl}/nextCodigo`);
}


//comunicacion entre componentes

getNuevoProveedor$(): Observable<Proveedor>{
  return this.nuevoProveedorSubject.asObservable();
}



}
