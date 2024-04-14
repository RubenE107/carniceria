import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../../services/producto.service';
import { Producto } from 'src/app/models/Producto';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';
import { Oferta } from 'src/app/models/Oferta';
import { OfertaService } from 'src/app/services/oferta.service';
import { environment } from 'src/environments/environment';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
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
  preciomax!: number
  ofertas: Oferta[] = [];

  p = 1
  pageSize = 8

  cantidad = 0
  idCarrito = -1
  cantDisp = 0

  liga: string = ""

  imgUsuario: any;
  fileToUpload: any;

  rol: any = localStorage.getItem('id_rol')

  ngOnInit(): void {
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  constructor(private imagenesService: ImagenesService, private productoService: ProductoService, private carritoService: CarritoService,
    private ofertaService: OfertaService, private router: Router, private translate: TranslateService) {
    this.liga = environment.API_URI_IMAGENES + "/productos";
    this.imgUsuario = null;
    this.fileToUpload = null;
    this.producto = new Producto();
    this.reiniciaVariables();
    this.list()
    this.getAnimal()
  }

  mostrarImagen(id_usuario: any) {
    this.productoService.listOne(id_usuario).subscribe(
      (resusuario: any) => {
        this.producto = resusuario;

        //console.log(this.usuario)
        $('#Imagen').modal();
        $("#Imagen").modal("open");
      },
      (err) => console.error(err)
    );
  }

  cargandoImagen(archivo: any) {
    this.imgUsuario = null;
    this.fileToUpload = archivo.files.item(0);
    
  }

  ActualizaImagen() {
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
      console.log("convirtiendo imagen")
      console.log(this.liga);


      this.imagenesService.guardarImagen(this.producto.id, "productos", blob).subscribe(
        (res: any) => {
          this.imgUsuario = blob;
          // Actualizar la variable 'liga' después de cargar la imagen
          this.liga = environment.API_URI_IMAGENES + "/productos/";

        },
        err => console.error(err));
    });
  }

  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) { //Espera a que se cargue la img
      reader.onload = (function (thefile) {
        return function (e) {
          // console.log(e.target?.result)
          resolve(e.target?.result);
        };

      })(file);
      reader.readAsDataURL(file);
    });

  }
  nuevoProducto() {
    this.producto = new Producto()

    $('#modalNuevoProducto').modal();
    $("#modalNuevoProducto").modal("open");

  }
  guardaNuevoProducto() {
    this.productoService.crear(this.producto.nombre, this.producto.animal, this.producto.precio, this.producto.cantidad, this.producto.descripcion)
      .subscribe((resusuario: any) => {
        $('#modalNuevoProducto').modal('close');
        console.log(resusuario.insertId);
        this.producto.id=resusuario.insertId;
        this.ActualizaImagen()
        this.list();

      },
        err => console.error(err)
      );

    this.list();
  }

  agregaCarrito(producto_id: any, producto_cant: any) {
    this.idCarrito = producto_id
    this.cantidad = 1
    this.cantDisp = producto_cant
    $('#modalAgregaCarrito').modal();
    $("#modalAgregaCarrito").modal("open");

  }
  guardaCarrito(id_producto: any) {
    let aux1: any = localStorage.getItem('id');
    let aux = parseInt(aux1)
    if (this.cantidad > this.cantDisp || this.cantidad < 1) {
      $('#modalError').modal();
      $("#modalError").modal("open");
      return;
    }
    this.carritoService.crear(this.cantidad, this.idCarrito, aux).subscribe((resUsuario: any) => {
      this.producto = resUsuario;

    },
      err => console.log(err)
    );
    $('#modalAgregaCarrito').modal('close');
  }
  modificaProducto(id: any) {
    this.productoService.listOne(id).subscribe((resUsuario: any) => {
      this.producto = resUsuario;
      $('#modalModificaProducto').modal();
      $("#modalModificaProducto").modal("open");
    },
      err => console.log(err)
    );


  }
  guardaModifica() {
    this.producto.animal = this.producto.animal.toLocaleLowerCase();
    this.productoService.actualizar(this.producto).subscribe((resusuario: any) => {
      $('#modalModificaProducto').modal('close');
      this.list();
    },
      err => console.error(err)
    );

    this.list();
  }
  eliminaProducto(id_producto: any) {

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
        this.productoService.eliminar(id_producto).subscribe(
          (resusuario: any) => {
            this.list()
            this.VerificaOferta()

          },
          (err) => console.error(err)
        );

        Swal.fire({
          title: this.translate.instant('¡Eliminado!'),
          text: this.translate.instant('El producto ha sido eliminado.'),
          icon: 'success',
        });
      }
    });
  }
  eliminaFiltros() {
    this.reiniciaVariables()
    this.list()


  }
  reiniciaVariables() {
    this.aux = "";
    this.preciomin = 0;
    this.preciomax = 500

  }
  list() {
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
  VerificaOferta() {
    this.ofertaService.listIdProducto().subscribe(
      (resOferta: any) => {
        this.ofertas = resOferta;
        for (let i = 0; i < resOferta.length; i++) {
          for (let j = 0; j < this.productos.length; j++) {
            if (resOferta[i].id_producto == this.productos[j].id)
              this.productos[j].oferta = true;
          }
        }
        console.log(resOferta);
      },
      (err) => console.error(err)
    );
  }
  getAnimal() {
    this.productoService.getAnimal().subscribe(
      (resusuario: any) => {
        this.animales = resusuario;
        //console.log(resusuario);
        console.log(this.animales);
      },
      (err) => console.error(err)
    );
  }
  filtraprecio() {
    this.productoService.filtraprecio(this.preciomin, this.preciomax).subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        this.VerificaOferta()

        //console.log(resusuario);
        console.log(resusuario);
      },
      (err) => console.error(err)
    );
  }
  listAnimal() {
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
  cerrErr() {
    $('#modalError').modal('close');
  }

}

class Animal {
  animal: string;
  constructor() {
    this.animal = ''
  }
}

