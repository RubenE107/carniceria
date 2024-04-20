import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Carrito } from 'src/app/models/Carrito';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { OfertaService } from 'src/app/services/oferta.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carritos: Carrito[] = [];
  carrito = new Carrito();
  totalCarrito: number = 0;
  cantidadDisponible = 0;
  carrErrr = 0;

  totalPro = 0;
  tCarrAct = 0;

  liga : string =""
  idioma :any = '1'
  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private router: Router,
    private ofertaService: OfertaService,
    private translate: TranslateService,
    private cambioIdiomaService:CambioIdiomaService
  ) {
    this.liga = environment.API_URI_IMAGENES + "/productos";
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
    )    //console.log(localStorage.getItem('id'))
    let fecha = new Date();
    // console.log(fecha.getDate());
    // console.log(fecha.getDay());
    // console.log(fecha.toJSON().substring(0, 10));
    // console.log(fecha.toDateString().substring(0, 10));
    // console.log(fecha.getFullYear());

    this.list();
  }
  ngOnInit(): void {}

  verificar() {
    console.log('Inicia verificar');
    this.carrErrr = 0;
    console.log('jfkjadslfjadsk;lfjdsk;la');
    console.log('esto es lo que tiene: ', this.carritos);
    for (let tCarro of this.carritos) {
      this.tCarrAct = tCarro.id;
      this.productoService.getCantidad(tCarro.id_producto).subscribe(
        (resusuario: any) => {
          this.totalPro = resusuario.cantidad;
          console.log('Verificando a: ', this.totalPro);
          if (this.totalPro < tCarro.cantidad) {
            this.carrErrr = 1;
            console.log('Si ocurrió');
            $('#modalError').modal();
            $('#modalError').modal('open');
            return;
          }
        },
        (err) => console.error(err)
      );
      if (this.carrErrr == 1) {
        break;
      }
    }
  }

  cerrErr() {
    this.carritoService
      .modificarCarrito(this.totalPro, this.tCarrAct)
      .subscribe(
        (resusuario: any) => {
          this.totalCarrito = resusuario.precioTotal;
          console.log('Llegó aquí v;');
          this.list();
          $('#modalError').modal('close');
          this.list();
          //this.carrErrr = 0
        },
        (err) => console.error(err)
      );
  }

  total() {
    this.carritoService.totalCarrito(localStorage.getItem('id')).subscribe(
      (resusuario: any) => {
        this.totalCarrito = resusuario.precioTotal;
        //this.verificar();
      },
      (err) => console.error(err)
    );
  }

  decrementar() {
    if (this.carrito.cantidad <= 0.5)
      document.getElementById('decrementar')?.ariaDisabled;
    else {
      this.carrito.cantidad -= 0.5;
    }
  }
  aumentar() {
    if (this.carrito.cantidad >= this.cantidadDisponible)
      document.getElementById('incrementar')?.ariaDisabled;
    else {
      this.carrito.cantidad += 0.5;
    }
  }
  modificar() {
    if (
      this.carrito.cantidad < 0.5 ||
      this.carrito.cantidad > this.cantidadDisponible
    ) {
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('Oops...'),
        text: this.translate.instant('¡Algo salió mal!'),
      });
    } else {
      this.carritoService
        .modificarCarrito(this.carrito.cantidad, this.carrito.id)
        .subscribe(
          (resusuario: any) => {
            $('#modalCantidad').modal('close');
            this.list();
          },
          (err) => console.error(err)
        );
    }
  }

  modificaCantidad(id: any) {
    this.carritoService.listOne(id).subscribe(
      (res: any) => {
        this.carrito = res;
        this.productoService.getCantidad(this.carrito.id_producto).subscribe(
          (res2: any) => {
            this.cantidadDisponible = res2.cantidad;
            console.log(res2.cantidad);
            $('#modalCantidad').modal();
            $('#modalCantidad').modal('open');
          },
          (err) => console.error(err)
        );
      },
      (err) => console.error(err)
    );
  }

  list() {
    this.carritoService
      .listCarritoProducto(localStorage.getItem('id'))
      .subscribe(
        (resusuario: any) => {
          this.carritos = resusuario;
          console.log(resusuario);
          this.total();

          //console.log(resusuario);
        },
        (err) => {
          console.error(err);
        }
      );
  }

  compraCarrito()
  {
    if(this.carritos.length < 1){
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('Oops...'),
        text: this.translate.instant('¡No tienes productos en tu carrito!'),
      });
      return;
    }
    for(let i=0; i<this.carritos.length; i++){
      console.log(this.carritos, "i: ", i)
      this.tCarrAct = this.carritos[i].id;
      this.productoService.getCantidad(this.carritos[i].id_producto).subscribe((resUsuario:any)=>{
        console.log("resultado de la cantidad", resUsuario.cantidad, "Ademas: ",this.carritos[i].cantidad)
        if(resUsuario.cantidad < this.carritos[i].cantidad){
          console.log("Aqui está entrando a la condicional")
          $('#modalError').modal();
          $('#modalError').modal('open');
          return;
        }
        else{
          this.productoService.reducirCantidad(this.carritos[i].id_producto, this.carritos[i].cantidad).subscribe((resReducir:any)=>{
            this.productoService.getCantidad(this.carritos[i].id_producto).subscribe((resCantidad:any)=>{
              console.log("ResCantidad: ", resCantidad)
              if(resCantidad.cantidad==0){
                this.ofertaService.anularOferta(this.carritos[i].id_producto).subscribe((resAnular:any)=>
                {
                },(err)=>console.error(err))
              }
            this.ventaService.crear(this.carritos[i].id_producto,localStorage.getItem('id'),this.carritos[i].cantidad * this.carritos[i].precio,this.carritos[i].cantidad).subscribe((resVenta:any)=>{
              //this.carritos = resVenta;
              this.total()
              this.carritoService.eliminar(this.carritos[i].id).subscribe((resEliminar:any)=>{
                //this.carritos = resEliminar
                this.carritos = []
                this.list();
              },(err)=>console.error(err))
            },(err)=>console.error(err))
            },(err)=>console.error(err))
          },(err)=>console.error(err))
        }
      },(err)=>console.error(err))
    }
    Swal.fire({
      icon: 'success',
      title: this.translate.instant('¡¡Hecho!!'),
      text: this.translate.instant('¡La compra se ha realizado con éxito!'),
    });
    

  }

  eliminar(id_producto: any) {
    Swal.fire({
      title: this.translate.instant('¿Estás seguro, bro?'),
      text: this.translate.instant('¡No es posible revertir esta acción!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('¡Sí, quiero eliminarlo!'),
      cancelButtonText: this.translate.instant('Cancelar')
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.eliminar(id_producto).subscribe(
          (resusuario: any) => {
            this.list();
          },
          (err) => console.error(err)
        );

        Swal.fire({
          title: this.translate.instant('¡Eliminado!'),
          text: this.translate.instant('Tu carrito ha sido eliminado.'),
          icon: 'success',
        });
      }
    });
  }
}
