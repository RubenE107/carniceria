import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/models/compra';
import { VentaService } from 'src/app/services/venta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  compras : Compra [] = [];
  compra = new Compra();
  p = 1;
  pageSize = 5
  liga : string =""
  constructor(private ventasServices: VentaService) { 
    this.liga = environment.API_URI_IMAGENES + "/productos";
    
  }


  ngOnInit(): void {
    this.ventasServices.listVentaUsuario(localStorage.getItem("id")).subscribe(
      (resusuario: any) => {
        this.compras = resusuario;
        //console.log(resusuario);
      },
      (err) => console.error(err)
    );
  }

}
