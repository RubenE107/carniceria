import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/models/compra';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
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
  idioma : any = '1'
  constructor(private ventasServices: VentaService,private cambioIdiomaService:CambioIdiomaService) { 
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
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg)=>
      {
        if(msg!="")
        {
          this.idioma = msg;
        }
        else
          this.idioma = localStorage.getItem("idioma")
      }
    )
  }
  

}
