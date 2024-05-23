import { Routes } from '@angular/router';


export const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES) 
  },
  { 
    path: 'cuentas', 
    loadChildren: () => import('./cuentas/cuentas.routes').then(m => m.CUENTAS_ROUTES) 
  },
  { 
    path: 'finanzas', 
    loadChildren: () => import('./finanzas/finanzas.routes').then(m => m.FINANZAS_ROUTES) 
  },
  { 
    path: 'pagos', 
    loadChildren: () => import('./pagos/pagos.routes').then(m => m.PAGOS_ROUTES) 
  },
  { 
  path: 'proveedores', 
  loadChildren: () => import('./proveedores/proveedores.routes').then(m => m.PROVEEDORES_ROUTES) 
  }
  
];
