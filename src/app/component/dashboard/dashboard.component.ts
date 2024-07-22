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
          icon: 'bi bi-graph-up-arrow',
          buttons: [
            { text: 'listado', link: 'pagos' },
            { text: 'boton prueba 2', link: '/' },            
          ]
        },
        {
          title: 'Proveedores',          
          icon: 'bi bi-graph-up-arrow',
          buttons: [
            { text: 'Listado', link: 'proveedores' },            
          ]
        },
        {
          title: 'Cuentas Corrientes',          
          icon: 'bi bi-graph-up-arrow',
          buttons: [
            { text: 'Listado', link: '/' },            
          ]
        },
        {
          title: 'Finanzas',          
          icon: 'bi bi-graph-up-arrow',
          buttons: [
            { text: 'Cajas', link: '/' },            
            { text: 'Cheques', link: '/' },            

            
          ]
        }
      ];

}
