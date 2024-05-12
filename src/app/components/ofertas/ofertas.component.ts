import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/models/Oferta';
import { Producto } from 'src/app/models/Producto';
import { OfertaService } from 'src/app/services/oferta.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoOfertaService } from 'src/app/services/producto-oferta.service';
import Swal from 'sweetalert2';
import { CorreoService } from 'src/app/services/correo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';

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
  oferta : Oferta = new Oferta() ;
  p = 1;
  pageSize = 4;
  qOcupado = false;
  AGRE_VER_oferta = true;
  nombre = '';
  descuento=0;
  idioma: any;
  fecha_inicio = new Date().toISOString().substring(0, 10);
  fecha_final = new Date().toISOString().substring(0, 10);

  aux : number =-1;
  liga : string =""
  constructor(
    private productoService: ProductoService,
    private ofertaService: OfertaService,
    private ProductoOferta: ProductoOfertaService,
    private correoService: CorreoService,
    private usuarioService: UsuarioService,
    private translate: TranslateService,
    private cambioIdiomaService:CambioIdiomaService
  ) {
    this.liga = environment.API_URI_IMAGENES + "/productos";

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
    this.listAll_Ofertas_Producto()
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
    )

}



aplicarMismoDE(){
  var elemento = <HTMLInputElement> document.getElementById("descuentoTodos");
  this.qOcupado = elemento.checked
  //console.log("Cambió, ahora es: ", this.qOcupado)
  
  if(this.qOcupado){
  let i:number;
  for(i=0; i<this.A_oferta.length;i++)
  {
    this.A_oferta[i].porc_descuento = this.descuento;
  }
}
  
}
  AplicarOferta() {
    let textOf :string[] = [];
    let ides: number[] =[]
    //console.log("aplicando oferta a:",this.A_oferta);
    this.A_oferta.forEach(oferta => {
      this.ProductoOferta.create(oferta.id_producto,1, oferta.precio_orig, oferta.porc_descuento).subscribe((resOferta)=>
      {
        //console.log("Eso devolvió: ", resOferta);
        textOf.push("Increible descuento: " + oferta.nombre_producto + " está a " + oferta.porc_descuento + "% de descuento\n");
        ides.push(oferta.id_producto)
      });
     
    });
   
    Swal.fire({
      title: this.translate.instant('¿Quieres enviar un correo?'),
      text: this.translate.instant("Ya se crearon las ofertas.\nSe enviará un correo a los clientes."),
      showDenyButton: true,
      confirmButtonText: this.translate.instant(`Sí`),
      denyButtonText: this.translate.instant(`No`),
  }).then((result) => {
      if (result.isConfirmed) {
          /*var message: any ={};
      message = {
      from: "equipWed@hotmail.com",
      to: correo,
      bcc: "",
      subject: "Probando ando",
      attachment: [
      { data: `¡¡Te damos la más cordial bienvenida !!`, alternative: true }
      ]
      };
      //console.log(message);*/
      this.usuarioService.list().subscribe((resusuario: any) => {
        var correo: any = [];
        resusuario.forEach((usuario: any) => {
          correo.push(usuario.correo);
        });
        for (let i = 0; i < correo.length; i++) {
          this.correoService.enviarCorreoOferta({"correo":correo[i], "texto":textOf, "productos": ides}).subscribe((resusuario: any) => {},
          err => console.error(err));
        } 
      
  });
  }
});
  }

  actualizarOferta(id_oferta: any,id_producto:any,fecha_inicio:any, fecha_final:any , porc_descuento:any) {
    $('#modalModificaOferta').modal();
    $("#modalModificaOferta").modal("open");
    this.oferta.id_oferta=id_oferta;
    this.oferta.id_producto=id_producto
    this.oferta.fecha_inicio = fecha_inicio
    this.oferta.fecha_fin = fecha_final
    this.oferta.porc_descuento = porc_descuento
  }
  guardarActualizarOferta(){
    this.ofertaService.updateWithoutName(this.oferta.id_oferta, this.oferta.fecha_inicio, this.oferta.fecha_fin).subscribe(
      (resusuario: any) => {
        this.ProductoOferta.update(this.oferta.id_oferta,this.oferta.id_producto, this.oferta.porc_descuento).subscribe(
          (resusuario: any) => {
            this.listAll_Ofertas_Producto()
    
          },
          (err) => console.error(err)
        );

      },
      (err) => console.error(err)
    );

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
    ////console.log("se ha seleccionado un producto");
    ////console.log(producto_id);
    ////console.log(this.ofertas);
    let ofertaEncontrada = this.ofertas.some(oferta => oferta.id_producto === producto_id);
    ////console.log(ofertaEncontrada);



    if (!this.listaProductos.includes(producto_id) && !ofertaEncontrada) {
      this.listaProductos.push(producto_id);
    }
    if(!ofertaEncontrada){
    ////console.log("lista de id productos:",this.listaProductos);
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
            // //console.log(this.A_oferta[i].id);
            // //console.log("¿==?");
            // //console.log(resusuario.id);
            if (this.A_oferta[i].id_producto == resusuario.id) {
              Encotrado = true;
            }
            ////console.log(i);
            i++;
          }
        }
        if (!Encotrado) {
          let auxOferta = new Oferta();
          auxOferta.id_producto = resusuario.id;
          auxOferta.nombre_producto = resusuario.nombre;
          auxOferta.precio_orig = resusuario.precio;
          

          this.A_oferta.push(auxOferta);
        }
        ////console.log(resusuario);
        //console.log('producto a modificar=', this.A_oferta);
      },
      (err) => console.error(err)
    );
  }else{
    Swal.fire({
      icon: 'error',
      title: this.translate.instant('Oops...'),
      text: this.translate.instant('El producto ya tiene una oferta asignada'),
    });
  
  }
  }
  getAnimals() {
    this.productoService.getAnimal().subscribe(
      (resusuario: any) => {
        this.animales = resusuario;
        ////console.log(resusuario);
        
        //console.log(this.animales);
      },
      (err) => console.error(err)
    );
  }
  listAnimal() {
    this.p = 1
    if (this.aux == -1)
    {
      this.eliminaFiltros();
    }
    else
    {
      this.productoService.listAnimal(this.animales[this.aux].nombre_animal  ).subscribe(
        (resusuario: any) => {
          this.productos = resusuario;
          
          ////console.log(resusuario);
          //console.log(this.productos);
        },
        (err) => console.error(err)
      );
    }
  }
  eliminaFiltros() {
    this.aux = -1;
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

    if (this.A_oferta[i].porc_descuento > 100) {
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('Oops...'),
        text: this.translate.instant('El porcentaje de descuento no puede ser mayor a 100'),
      }).then(() => {
        this.A_oferta[i].porc_descuento = 0;
      });
    }
    if (this.A_oferta[i].porc_descuento < 0) {
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('Oops...'),
        text: this.translate.instant('El porcentaje de descuento no puede ser menor a 0'),
      }).then(() => {
        this.A_oferta[i].porc_descuento = 0;
      });
    }
  }
  listAll_Ofertas_Producto(){
    this.ofertaService.listAll_Ofertas_Producto().subscribe(
      (resusuario: any) => {
        this.ofertas = resusuario;
        
        //console.log("ofertas:",this.ofertas);
      },
      (err) => console.error(err)
    );
  
  }
}
class Animal {
  nombre_animal: string;
  animal_name: string;
  constructor() {
    this.nombre_animal = ''
    this.animal_name = ''
  }
}
