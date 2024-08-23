import { Routes } from "@angular/router";
import { ProveedoresComponent } from "./proveedores.component";
import { ListadoProveedoresComponent } from "./listado-proveedores/listado-proveedores.component";
import { FacturasComponent } from "./facturas/facturas.component";



export const PROVEEDORES_ROUTES: Routes = [
    {path:'', component: ProveedoresComponent},
    {path:'listado', component: ListadoProveedoresComponent},
    {path:'facturas', component: FacturasComponent},
]