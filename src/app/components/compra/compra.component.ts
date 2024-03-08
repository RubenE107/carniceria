import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { Compra } from 'src/app/models/compra';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  compras : Compra [] = [];
  compra!: Compra;
  constructor(private ventasServices: VentaService) { 

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
