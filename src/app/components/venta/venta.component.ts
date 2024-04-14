import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Venta } from 'src/app/models/Venta';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  ventas: Venta[] = []
  venta !: Venta
  productos: Pro[] = []
  aux = ""
  compramin = 0
  compramax = 500
  Ventatotal = -1
  GananciaTotal = -1
  p=1
  pageSize = 5

  liga : string =""

  constructor(private ventasServices: VentaService, private productoService: ProductoService, private router: Router, private translate: TranslateService) {
    if (localStorage.getItem("id_rol") != '3')
      router.navigateByUrl("home/producto")
    this.liga = environment.API_URI_IMAGENES + "/productos";

  }
  ngOnInit(): void {
    $(document).ready(function () {
      $('select').formSelect();
    });
    $(document).ready(function(){
      $('.datepicker').datepicker();
    });
    this.productoService.getNombresProductos().subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        //console.log(resusuario);
        console.log(this.productos);
      },
      (err) => console.error(err)
    );
    this.venta = new Venta();
    this.venta.fecha = new Date().toJSON().substring(0,10);
    this.list();

  }
  list() {
    this.ventasServices.list().subscribe(
      (resusuario: any) => {
        this.ventas = resusuario;
        //console.log(resusuario);
      },
      (err) => console.error(err)
    );
  }
  actualizarFecha(date?: any) {
    console.log(date)
    if (date) {
      this.venta.fecha = date;
    }
  }
  filtrarFechaYear(){
    console.log(this.venta.fecha.substring(0,4))
    this.ventasServices.filtraYear(this.venta.fecha.substring(0,4)).subscribe(
      (resusuario: any) => {
        this.ventas = resusuario;
        //console.log(resusuario);
        console.log(resusuario);

      },
      (err) => console.error(err)
    );
  }
  filtrarFechaYearMonth(){
    console.log(this.venta.fecha.substring(5,7))
    this.ventasServices.filtraYearMonth(this.venta.fecha.substring(0,4),this.venta.fecha.substring(5,7)).subscribe(
      (resusuario: any) => {
        this.ventas = resusuario;
        //console.log(resusuario);
        console.log(resusuario);

      },
      (err) =>{
        console.error(err)
        Swal.fire({
          icon: "error",
          title: this.translate.instant("Oops..."),
          text: this.translate.instant("¡No tienes ventas de productos en este año y mes!"),
        });
      } 
    );
  }

  listProducto() {
    this.p = 1
    this.Ventatotal = -1;
    this.ventasServices.VentasProducto(this.aux).subscribe(
      (resusuario: any) => {
        this.ventas = resusuario;
        console.log(resusuario);

        this.ventasServices.totalVentaProducto(this.aux).subscribe(
          (resusuario: any) => {
            this.Ventatotal = resusuario.total;
            //console.log(resusuario);
            console.log(resusuario);

          },
          (err) => console.error(err)
        );
        this.ventasServices.gananciaVentaProducto(this.aux).subscribe(
          (resusuario: any) => {
            this.GananciaTotal = resusuario.gananciaTotal;
            //console.log(resusuario);
            console.log(resusuario);

          },
          (err) => console.error(err)
        );
      },
      (err) => {
        console.error(err)
        Swal.fire({
          icon: "error",
          title: this.translate.instant("Oops..."),
          text: this.translate.instant("¡No hay ventas de este producto!\nIntenta con otro producto.")
        });
      }
    );
  }
  filtraPrecio() {
    this.ventasServices.filtraprecio(this.compramin, this.compramax).subscribe(
      (resusuario: any) => {
        this.ventas = resusuario;
        //console.log(resusuario);
        //console.log(resusuario);

      },
      (err) => console.error(err)
    );
  }
  reiniciaVariables() {
    this.aux = ""
    this.compramin = 0
    this.compramax = 500
    this.Ventatotal = -1
    this.GananciaTotal = -1
  }
  eliminaFiltros() {
    this.reiniciaVariables()
    this.list()
  }
}

class Pro {
  id: number;
  nombre: string;
  constructor() {
    this.id = -1;
    this.nombre = ''
  }
}