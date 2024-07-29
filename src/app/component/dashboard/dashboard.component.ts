import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import {DataTablesModule} from 'angular-datatables'
import { ProveedoresComponent } from '../../proveedores/proveedores.component'
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';

 
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavbarComponent, DataTablesModule, ProveedoresComponent, RouterModule, CardComponent]
})
export class DashboardComponent {

    cards = [
        {
          title: 'Pagos',
          route:'pagos',          
          icon: 'bi bi-cash-coin',
          buttons: [
            { text: 'listado', link: 'pagos' },
            { text: 'boton prueba 2', link: '/' },            
          ]
        },
        {
          title: 'Proveedores',        
          route:'proveedores',  
          icon: 'bi bi-clipboard-check',
          buttons: [
            { text: 'Listado', link: 'proveedores' },            
          ]
        },
        {
          title: 'Cuentas Corrientes',
          route:'cuentas',          
          icon: 'bi bi-newspaper',
          buttons: [
            { text: 'Listado', link: 'cuentas' },            
          ]
        },
        {
          title: 'Finanzas', 
          route:'finanzas',         
          icon: 'bi bi-bar-chart-line',
          buttons: [
            { text: 'Cajas', link: '/' },            
            { text: 'Cheques', link: '/' },            

            
          ]
        }
      ];

}
