import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class ProductoService {
constructor(private http: HttpClient) { }

list() {
  return this.http.get(`${environment.API_URI}/productos/showAll/`);
}
listOne(id: any){
  return this.http.get(`${environment.API_URI}/productos/listOne/${id}`);
}
crear(producto: any){
  const nuevo ={
    "nombre":producto.nombre,
    "animal":producto.animal,
    "precio":producto.precio,
    "cantidad":producto.cantidad,
    "descripcion":producto.descripcion,
    "fotito":producto.fotito,
    "name": producto.name,
    "animal_eng": producto.animal_eng,
    "description" : producto.description
  }
  return this.http.post(`${environment.API_URI}/productos/create`,nuevo);
}
actualizar(producto: any){
  const nuevo ={
    "nombre":producto.nombre,
    "animal":producto.animal,
    "precio":producto.precio,
    "cantidad":producto.cantidad,
    "descripcion":producto.descripcion,
    "fotito":producto.fotito,
    "name": producto.name,
    "animal_eng": producto.animal_eng,
    "description" : producto.description
  }
  return this.http.put(`${environment.API_URI}/productos/update/${producto.id}`,nuevo);

}
getCantidad(id: any){
  return this.http.get(`${environment.API_URI}/productos/getCantidad/${id}`);
}

getAnimal(){
  return this.http.get(`${environment.API_URI}/productos/getAnimal/`);
}
getNombresProductos(){
  return this.http.get(`${environment.API_URI}/productos/getNombreProducto/`);
}
listAnimal(animal: any){
  return this.http.get(`${environment.API_URI}/productos/listAnimal/${animal}`);
}

filtraprecio(n1: any, n2 : any){
  return this.http.post(`${environment.API_URI}/productos/filtraPrecio/`,{"valor1":n1,"valor2":n2});
}
eliminar(id: any){
  return this.http.delete(`${environment.API_URI}/productos/delete/${id}`);
}
reducirCantidad(id:any, cantidad:any)
{
  let json={
    "id":id,
    "cantidad":cantidad
  }
  return this.http.put(`${environment.API_URI}/productos/reducirCant/`,json)
}

}