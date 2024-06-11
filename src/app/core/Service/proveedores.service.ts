import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private apiUrl = 'http://localhost:8080/proveedores'; // URL de la API

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
}

getLastCodigo(): Observable<number>{
  return this.http.get<number>(`${this.apiUrl}/lastCodigo`);
}

getNextCodigo(): Observable<number>{
  return this.http.get<number>(`${this.apiUrl}/nextCodigo`);
}




}
