import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Venta } from 'src/app/models/Venta';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
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
  aux: number = -1
  compramin = 0
  compramax = 500
  Ventatotal = -1
  GananciaTotal = -1
  p = 1
  pageSize = 5


  liga: string = ""
  idioma: any = '1'
  constructor(private ventasServices: VentaService,
    private productoService: ProductoService,
    private router: Router,
    private translate: TranslateService,
    private cambioIdiomaService: CambioIdiomaService) {
    if (localStorage.getItem("id_rol") != '3')
      router.navigateByUrl("home/producto")
    this.liga = environment.API_URI_IMAGENES + "/productos";
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
    this.venta.fecha = new Date().toJSON().substring(0, 10);
    this.list();
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        if (msg != "") {
          this.idioma = msg;
        }
        else
          this.idioma = localStorage.getItem("idioma")
        if (this.idioma == 1) {
          $(document).ready(function () {
            $('.datepicker').datepicker({
              i18n: {
                months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"],
                cancel:"Cancelar",
                clear: "Limpiar",
                done: "Hecho",
              }
            }).open();
          });
        }
        if (this.idioma == 2) {
          $(document).ready(function () {
            $('.datepicker').datepicker({
              i18n: {
                months: ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "Dicember"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"],
                weekdays: ["Sunday", "Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"],
                weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"],
                cancel:"Cancel",
                clear: "Clear",
                done: "Ok",
              }
            }).open();
          });
        }
      }
    )
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

    if (date) {
      this.venta.fecha = date;
    }
  }
  filtrarFechaYear() {
    console.log(this.venta.fecha.substring(0, 4))
    this.ventasServices.filtraYear(this.venta.fecha.substring(0, 4)).subscribe(
      (resusuario: any) => {
        this.ventas = resusuario;
        //console.log(resusuario);
        console.log(resusuario);

      },
      (err) => console.error(err)
    );
  }
  filtrarFechaYearMonth() {
    console.log(this.venta.fecha.substring(5, 7))
    this.ventasServices.filtraYearMonth(this.venta.fecha.substring(0, 4), this.venta.fecha.substring(5, 7)).subscribe(
      (resusuario: any) => {
        this.ventas = resusuario;
        //console.log(resusuario);
        console.log(resusuario);

      },
      (err) => {
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

    if (this.aux == -1)
    {
      this.eliminaFiltros();
    }
    else
    {
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
    this.aux = -1
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
  nombre_producto: string;
  name_producto: string;
  constructor() {
    this.id = -1;
    this.nombre_producto = ''
    this.name_producto = ''
  }
}