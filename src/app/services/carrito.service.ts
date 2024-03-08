import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Carrito } from '../models/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${environment.API_URI}/carrito/showAll/`);
  }
  listOne(id: any) {
    return this.http.get(`${environment.API_URI}/carrito/listOne/${id}`);
  }
  listCarritoUsuario(id_usuario: any) {
    return this.http.get(`${environment.API_URI}/carrito/listCarritoUsuario/${id_usuario}`);
  }
  listCarritoProducto(id: any){
    return this.http.get(`${environment.API_URI}/carrito/listCarritoProducto/${id}`);
  }
  crear( cantidad: any, id_producto: any, id_usuario: any) {
    const car ={
      "cantidad": cantidad,
      "id_producto": id_producto,
      "id_usuario": id_usuario
      
    }
    return this.http.post(`${environment.API_URI}/carrito/create`, car);
  }
  totalCarrito(id_usuario: any){
    return this.http.get(`${environment.API_URI}/carrito/totalCarrito/${id_usuario}`)
  }
  modificarCarrito(cantidad:any,id:any){
    return this.http.put(`${environment.API_URI}/carrito/update/${id}`, {"cantidad":cantidad});
  }
  eliminar(id: any){
    return this.http.delete(`${environment.API_URI}/carrito/delete/${id}`)
  }
}

