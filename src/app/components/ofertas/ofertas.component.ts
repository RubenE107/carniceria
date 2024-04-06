import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/models/Oferta';
import { Producto } from 'src/app/models/Producto';
import { OfertaService } from 'src/app/services/oferta.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  productos: Producto[] = [];
  animales: Animal[] = [];
  ofertas: Oferta[] = [];
  p=1
  pageSize = 4
  aux = ""
  constructor(private productoService: ProductoService,private ofertaService:OfertaService) { 
    this.listProductos();
    this.getAnimals();
  }
  
  ngOnInit(): void {
  }
  listProductos(){
    this.productoService.list().subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
      },
      (err) => console.error(err)
    );
  }
  AgregaOferta(producto_id:any){
    console.log("se ha seleccionado un producto");
    
  }
  getAnimals(){
    this.productoService.getAnimal().subscribe(
      (resusuario: any) => {
        this.animales = resusuario;
        //console.log(resusuario);
        console.log(this.animales);
      },
      (err) => console.error(err)
    );
  }
  listAnimal(){
    this.p = 1
    this.productoService.listAnimal(this.aux).subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        //console.log(resusuario);
        console.log(this.productos);
      },
      (err) => console.error(err)
    );
  }
  eliminaFiltros(){
    this.aux=""
    this.listProductos()
  }
}

class Animal{
  animal: string;
  constructor(){
    this.animal=''
  } 
}

