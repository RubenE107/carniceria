import { Component, OnInit } from '@angular/core';
//import { Console } from 'console';
import { Oferta } from 'src/app/models/Oferta';
import { Producto } from 'src/app/models/Producto';
import { OfertaService } from 'src/app/services/oferta.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
})
export class OfertasComponent implements OnInit {
  productos: Producto[] = [];
  ofertas: Oferta[] = [];
  //A_oferta:Producto[]=[];
  A_oferta: Oferta[] = [];
  animales: Animal[] = [];
  listaProductos: any = [];
  p = 1;
  pageSize = 4;
  qOcupado = false;
  AGRE_VER_oferta = true;
  nombre = '';
  descuento=0;

  fecha_inicio = new Date().toISOString().substring(0, 10);
  fecha_final = new Date().toISOString().substring(0, 10);

  aux = '';
  constructor(
    private productoService: ProductoService,
    private ofertaService: OfertaService
  ) {
    this.listProductos();
    this.getAnimals();
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.datepicker').datepicker();
    });
    $(document).ready(function () {
      $('.modal').modal();
    });
}
aplicarMismoDE(){
  var elemento = <HTMLInputElement> document.getElementById("descuentoTodos");
  this.qOcupado = elemento.checked
  console.log("Cambió, ahora es: ", this.qOcupado)
  
  if(this.qOcupado){
  let i:number;
  for(i=0; i<this.A_oferta.length;i++)
  {
    this.A_oferta[i].descuento = this.descuento;
  }
}
  
}
  AplicarOferta() {
    /*this.ofertaService.create(this.nombre,this.fecha_inicio, this.fecha_final).subscribe(
      (resusuario: any) => {
        console.log(resusuario);
        // this.ofertas.push(resusuario);
        // this.fecha_inicio = new Date().toISOString().substring(0, 10);
        // this.fecha_final = new Date().toISOString().substring(0, 10);
      },
      (err) => console.error(err)
    );*/



    Swal.fire({
      title: '¿Quieres enviar un correo?',
      text: "Ya se crearon las ofertas\nSe enviará un correo a los clientes",
      showDenyButton: true,
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
  }).then((result) => {
      if (result.isConfirmed) {
          
      }
  });




  }
  listProductos() {
    this.productoService.list().subscribe(
      (resusuario: any) => {
        this.productos = resusuario;

        this.productos.sort((a, b) => a.id - b.id);
      },
      (err) => console.error(err)
    );
  }

  quitar(id:any)
  {
    this.productoService.listOne(id).subscribe((resProducto:any)=>
    {
      var Encontrado = false;
      var i = 0;
      for(i=0; i<this.A_oferta.length&&!Encontrado; i++)
      {
        if(this.A_oferta[i].id_producto==id)
        {
          Encontrado = true;
          this.productos.push(resProducto);
          this.A_oferta.splice(i,1);
          this.productos.sort((a, b) => a.id - b.id);
        }
      }
    },(err)=> console.error(err));
  }
  
  AgregaOferta(producto_id: any) {
    //console.log("se ha seleccionado un producto");
    //console.log(producto_id);
    if (!this.listaProductos.includes(producto_id)) {
      this.listaProductos.push(producto_id);
    }
    //console.log("lista de id productos:",this.listaProductos);
    this.productoService.listOne(producto_id).subscribe(
      (resusuario: any) => {
        var Encotrado = false;
        var i = 0;
        //se elimina el producto de la lista de productos a modificar para agregarlo a la lista de productos de la oferta
        while (i < this.productos.length && !Encotrado) {
          if (this.productos[i].id == producto_id) {
            Encotrado = true;
            this.productos.splice(i, 1);
          }
          i++;
        }
        //ajustar el Encotrado para que no se repita el producto en la lista de productos de la oferta
        Encotrado = false;

        ///si no hay productos en la lista de modificar oferta ya no se agrega
        if (this.A_oferta.length == 0) {
          Encotrado = false;
        } else {
          while (i < this.A_oferta.length && !Encotrado) {
            // console.log(this.A_oferta[i].id);
            // console.log("¿==?");
            // console.log(resusuario.id);
            if (this.A_oferta[i].id == resusuario.id) {
              Encotrado = true;
            }
            //console.log(i);
            i++;
          }
        }
        if (!Encotrado) {
          let auxOferta = new Oferta();
          auxOferta.id_producto = resusuario.id;
          auxOferta.nombre_producto = resusuario.nombre;
          auxOferta.precio_original = resusuario.precio;
          

          this.A_oferta.push(auxOferta);
        }
        //console.log(resusuario);
        console.log('producto a modificar=', this.A_oferta);
      },
      (err) => console.error(err)
    );
  }
  getAnimals() {
    this.productoService.getAnimal().subscribe(
      (resusuario: any) => {
        this.animales = resusuario;
        //console.log(resusuario);
        console.log(this.animales);
      },
      (err) => console.error(err)
    );
  }
  listAnimal() {
    this.p = 1;
    this.productoService.listAnimal(this.aux).subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        //console.log(resusuario);
        console.log(this.productos);
      },
      (err) => console.error(err)
    );
  }
  eliminaFiltros() {
    this.aux = '';
    this.listProductos();
  }
  limitarDescuento(id:any) {
    let i:number;
    for(i=0; i>this.A_oferta.length;i++)
    {
      if(this.A_oferta[i].id_producto==id)
      {
        return;
      }
    }

    if (this.A_oferta[i].descuento > 100) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El descuento no puede ser mayor a 100',
      }).then(() => {
        this.A_oferta[i].descuento = 0;
      });
    }
    if (this.A_oferta[i].descuento < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El descuento no puede ser menor a 0',
      }).then(() => {
        this.A_oferta[i].descuento = 0;
      });
    }
  }
}

class Animal {
  animal: string;
  constructor() {
    this.animal = '';
  }
}
