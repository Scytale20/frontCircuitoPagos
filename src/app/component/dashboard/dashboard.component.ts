import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import {DataTablesModule} from 'angular-datatables'
import { ProveedoresComponent } from '../../proveedores/proveedores.component'
import { RouterModule } from '@angular/router';

 
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavbarComponent, DataTablesModule, ProveedoresComponent, RouterModule]
})
export class DashboardComponent {

}
