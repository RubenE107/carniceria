import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venta } from 'src/app/models/Venta';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
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
  aux = undefined
  compramin = 0
  compramax = 500
  Ventatotal = -1
  GananciaTotal = -1
  constructor(private ventasServices: VentaService, private productoService: ProductoService, private router: Router) {
    if (localStorage.getItem("id_rol") != '3')
      router.navigateByUrl("home/producto")

  }
  ngOnInit(): void {
    $(document).ready(function () {
      $('select').formSelect();
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
          title: "Oops...",
          text: "No tienes ventas de productos este año y mes!",
        });
      } 
    );
  }

  listProducto() {
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
          title: "Oops...",
          text: "No hay ventas de este producto!\nIntenta con otro producto"
        });
      }
    );
  }
  filtraPrecio() {
    this.ventasServices.filtraprecio(this.compramin, this.compramax).subscribe(
      (resusuario: any) => {
        this.ventas = resusuario;
        //console.log(resusuario);
        console.log(resusuario);

      },
      (err) => console.error(err)
    );
  }
  reiniciaVariables() {
    this.aux = undefined
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