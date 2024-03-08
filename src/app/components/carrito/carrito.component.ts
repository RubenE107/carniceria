import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/Carrito';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carritos: Carrito[] = [];
  carrito = new Carrito();
  totalCarrito : number = 0;
  cantidadDisponible = 0;
  constructor(private carritoService: CarritoService, private productoService: ProductoService, private ventaService: VentaService, private router: Router) {
    //console.log(localStorage.getItem('id'))
    let fecha = new Date();
    console.log(fecha.getDate())
    console.log(fecha.getDay())
    console.log(fecha.toJSON().substring(0,10)) 
    console.log(fecha.toDateString().substring(0,10))
    console.log(fecha.getFullYear())
    
    this.list();

    
  }
  ngOnInit(): void {
  }
  total(){
    this.carritoService.totalCarrito(localStorage.getItem('id')).subscribe(
      (resusuario: any) => {
        this.totalCarrito = resusuario.precioTotal;
      },
      (err) => console.error(err)
    );
  }

  decrementar(){
    if(this.carrito.cantidad<=0.5)
      document.getElementById("decrementar")?.ariaDisabled;
    else{
      this.carrito.cantidad -=.5;
    }
  }
  aumentar(){
    if(this.carrito.cantidad>=this.cantidadDisponible)
      document.getElementById("incrementar")?.ariaDisabled;
    else{
      this.carrito.cantidad+=.5;
    }

  }
  modificar(){

    if(this.carrito.cantidad<0.5 || this.carrito.cantidad>this.cantidadDisponible){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }else{
      this.carritoService.modificarCarrito(this.carrito.cantidad,this.carrito.id).subscribe(
        (resusuario: any) => {
          $('#modalCantidad').modal('close');
          this.list()
        },
        (err) => console.error(err)
        );
      }
    }

  modificaCantidad( id:any){
    this.carritoService.listOne(id).subscribe(
      (res: any) => {
        this.carrito=res;
        this.productoService.getCantidad(this.carrito.id_producto).subscribe(
          (res2: any) => {  
            this.cantidadDisponible = res2.cantidad;
            console.log(res2.cantidad)
            $('#modalCantidad').modal();
            $("#modalCantidad").modal("open");
          },
          (err) => console.error(err)   
          );
      },
      (err) => console.error(err)
    );
  }

  list(){
    this.carritoService.listCarritoProducto(localStorage.getItem('id')).subscribe(
      (resusuario: any) => {
        this.carritos = resusuario;
        console.log(resusuario);
        this.total();

        //console.log(resusuario);
      },
      (err) =>{
        console.error(err)
      } 
    );
  }
  compraCarrito(){
    if(this.carritos.length<1){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No tienes productos en tu carrito!",
      });
      return;
    }
    for(let i=0; i<this.carritos.length; i++){
      this.ventaService.crear(
        this.carritos[i].id_producto,
        localStorage.getItem('id'),
        this.carritos[i].cantidad*this.carritos[i].precio,
        this.carritos[i].cantidad
      ).subscribe(
        (resusuario: any) => {
          this.carritos = resusuario;
          console.log(resusuario);
          this.total();
  
          //console.log(resusuario);
        },
        (err) => console.error(err)
      );
    }
    for(let i=0; i<this.carritos.length; i++){
      this.carritoService.eliminar( this.carritos[i].id ).subscribe(
        (resusuario: any) => {
          this.carritos = resusuario;
          console.log(resusuario);
          this.carritos = []

          //console.log(resusuario);
        },
        (err) => console.error(err)
      );
    }
    this.list()
  }
  
  eliminar(id_producto:any){
    Swal.fire({
      title: '¿Estás seguro bro?',
      text: 'No es posible revertir este!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.eliminar(id_producto).subscribe(
          (resusuario: any) => {
            this.list()
          },
          (err) => console.error(err)
        );

        Swal.fire({
          title: 'Eliminado!',
          text: 'Tu carrito ha sido eliminado.',
          icon: 'success',
        });
      }
    });
  }
}
