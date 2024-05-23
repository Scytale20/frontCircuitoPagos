import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import {DataTablesModule} from 'angular-datatables'
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, DashboardComponent, DataTablesModule, NavbarComponent]
})
export class AppComponent {
  title = 'modulo-pagos';
  
}
