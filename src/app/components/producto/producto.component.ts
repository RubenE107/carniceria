import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../../services/producto.service';
import { Producto } from 'src/app/models/Producto';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';
import { Oferta } from 'src/app/models/Oferta';
import { OfertaService } from 'src/app/services/oferta.service';
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
  aux = ""
  preciomin!: number;
  preciomax!:number
  ofertas:Oferta[] = [];
  
  p=1
  pageSize = 8
  
  cantidad = 0
  idCarrito=-1
  cantDisp = 0
  rol:any = localStorage.getItem('id_rol')
  ngOnInit(): void {
    $(document).ready(function(){
      $('select').formSelect();
    }); 
  }

  constructor(private productoService: ProductoService, private carritoService: CarritoService,
    private ofertaService:OfertaService, private router: Router) {

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

  agregaCarrito(producto_id:any, producto_cant:any){
    this.idCarrito = producto_id
    this.cantidad=1
    this.cantDisp = producto_cant
    $('#modalAgregaCarrito').modal();
    $("#modalAgregaCarrito").modal("open");

  }
  guardaCarrito(id_producto: any){
    let aux1:any = localStorage.getItem('id');
    let aux = parseInt(aux1) 
    if(this.cantidad > this.cantDisp || this.cantidad<1)
    {
      $('#modalError').modal();
    $("#modalError").modal("open");
    return;
    }
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
            this.VerificaOferta()

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
    this.aux="";
    this.preciomin=0;
    this.preciomax= 500
    
  }
  list(){
    this.productoService.list().subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        this.VerificaOferta()

        //console.log(resusuario);
        console.log(this.productos);
      },
      (err) => console.error(err)
    );
  }
  VerificaOferta(){
    this.ofertaService.listIdProducto().subscribe(
      (resOferta: any) => {
        this.ofertas = resOferta;
        for(let i=0 ;i<resOferta.length;i++){
          for(let j =0; j<this.productos.length;j++){
            if(resOferta[i].id_producto == this.productos[j].id)
              this.productos[j].oferta=true;
          }
        }
        console.log(resOferta);
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
        this.VerificaOferta()

        //console.log(resusuario);
        console.log(resusuario);
      },
      (err) => console.error(err)
    );
  }
  listAnimal(){
    this.p = 1
    this.productoService.listAnimal(this.aux).subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        this.VerificaOferta()

        //console.log(resusuario);
        console.log(this.productos);
      },
      (err) => console.error(err)
    );
  }
  cerrErr()
  {
    $('#modalError').modal('close');
  }

}

class Animal{
  animal: string;
  constructor(){
    this.animal=''
  } 
}

