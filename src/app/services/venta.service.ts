import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }
  
  crear(id_producto:any, id_usuario:any , monto:any, cantidad:any){
    let nuevaVenta = {
      "fecha": new Date().toJSON().substring(0,10),
      "id_producto":id_producto,
      "id_usuario":id_usuario,
      "monto": monto,
      "cantidad":cantidad
    }
  return this.http.post(`${environment.API_URI}/ventas/create/`,nuevaVenta);

  }
  list(){
  return this.http.get(`${environment.API_URI}/ventas/showAll/`);
  }
  VentasProducto(id:any){
  return this.http.get(`${environment.API_URI}/ventas/ventasProducto/${id}`);

  }
  totalVentaProducto(id:any){
    return this.http.get(`${environment.API_URI}/ventas/totalVentaProducto/${id}`);
  }

  gananciaVentaProducto(id:any){
    return this.http.get(`${environment.API_URI}/ventas/gananciaVentaProducto/${id}`);

  }
  listVentaUsuario(id:any){
    return this.http.get(`${environment.API_URI}/ventas/listVentasUsuario/${id}`);

  }
  filtraprecio(min:any, max:any){
    let aux = {
      "valor1":min,
      "valor2":max
    }
  return this.http.post(`${environment.API_URI}/ventas/filtraMonto/`,aux);
  }
  filtraYear(year:any){
    return this.http.get(`${environment.API_URI}/ventas/filtraYear/${year}`);
  }
  filtraYearMonth(year:any, month:any){
    return this.http.get(`${environment.API_URI}/ventas/filtraYear/${year}/${month}`);
  }
 
  

}
