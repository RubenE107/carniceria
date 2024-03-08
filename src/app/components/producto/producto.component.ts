import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../../services/producto.service';
import { Producto } from 'src/app/models/Producto';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  producto!: Producto;
  animales: Animal[] = [];
  aux !: any ;
  preciomin!: number;
  preciomax!:number
  cantidad = 0
  idCarrito=-1
  rol:any = localStorage.getItem('id_rol')
  ngOnInit(): void {
    $(document).ready(function(){
      $('select').formSelect();
    }); 
  }

  constructor(private productoService: ProductoService, private carritoService: CarritoService, private router: Router) {

    this.producto = new Producto();
    this.reiniciaVariables();
    this.list()
    this.getAnimal()
  }

  nuevoProducto(){
    this.producto = new Producto()

      $('#modalNuevoProducto').modal();
      $("#modalNuevoProducto").modal("open");

  }
  guardaNuevoProducto(){
    this.productoService.crear(this.producto.nombre,this.producto.animal,this.producto.precio,this.producto.cantidad,this.producto.descripcion)
    .subscribe((resusuario: any) =>
    {
    $('#modalNuevoProducto').modal('close');
      this.list();
    },
    err => console.error(err)
    );
    
    this.list();
  }

  agregaCarrito(producto_id:any){
    this.idCarrito = producto_id
    this.cantidad=1
    $('#modalAgregaCarrito').modal();
    $("#modalAgregaCarrito").modal("open");

  }
  guardaCarrito(id_producto: any){
    let aux1:any = localStorage.getItem('id');
    let aux = parseInt(aux1) 
    this.carritoService.crear(this.cantidad,this.idCarrito,aux).subscribe((resUsuario:any)=>{
      this.producto = resUsuario;

    },
    err => console.log(err)
    );
    $('#modalAgregaCarrito').modal('close');
  }
  modificaProducto(id:any){
    this.productoService.listOne(id).subscribe((resUsuario:any)=>{
      this.producto = resUsuario;
      $('#modalModificaProducto').modal();
      $("#modalModificaProducto").modal("open");
    },
    err => console.log(err)
    );


  }
  guardaModifica(){
    this.producto.animal = this.producto.animal.toLocaleLowerCase();
    this.productoService.actualizar(this.producto).subscribe((resusuario: any) =>
    {
    $('#modalModificaProducto').modal('close');
      this.list();
    },
    err => console.error(err)
    );
    
    this.list();
  }
  eliminaProducto(id_producto:any){

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
        this.productoService.eliminar(id_producto).subscribe(
          (resusuario: any) => {
            this.list()
          },
          (err) => console.error(err)
        );

        Swal.fire({
          title: 'Eliminado!',
          text: 'Tu producto ha sido eliminado.',
          icon: 'success',
        });
      }
    });
  }
  eliminaFiltros(){
    this.reiniciaVariables()
    this.list()
  }
  reiniciaVariables(){
    this.aux=undefined;
    this.preciomin=0;
    this.preciomax= 500
    
  }
  list(){
    this.productoService.list().subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        //console.log(resusuario);
        console.log(this.productos);
      },
      (err) => console.error(err)
    );
  }
  getAnimal(){
    this.productoService.getAnimal().subscribe(
      (resusuario: any) => {
        this.animales = resusuario;
        //console.log(resusuario);
        console.log(this.animales);
      },
      (err) => console.error(err)
    );
  }
  filtraprecio(){
    this.productoService.filtraprecio(this.preciomin,this.preciomax).subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        //console.log(resusuario);
        console.log(resusuario);
      },
      (err) => console.error(err)
    );
  }
  listAnimal(){
    this.productoService.listAnimal(this.aux).subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        //console.log(resusuario);
        console.log(this.productos);
      },
      (err) => console.error(err)
    );
  }

}

class Animal{
  animal: string;
  constructor(){
    this.animal=''
  } 
}

