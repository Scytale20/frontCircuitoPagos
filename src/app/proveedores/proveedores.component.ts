import { Component } from '@angular/core';
import { CardComponent } from '../component/card/card.component';


@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent{  

  
  cards = [
    {
      title: 'Facturas',
      route:'facturas',          
      icon: 'bi bi-cash-coin',
      buttons: [
        { text: '', link: 'proveedores/facturas' },
                    
      ]
    },
    {
      title: 'Listado Proveedores',        
      route:'listado',  
      icon: 'bi bi-clipboard-check',
      buttons: [
        { text: '', link: 'proveedores/listado' },            
                    
      ]
    },    
  ]
  

  
  

  
  
  
 

 
  
  
  
   
  

  

  

  

    
   
  


  

}
