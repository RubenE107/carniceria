import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductoOfertaService {

  constructor(private http: HttpClient) { }
  create(id_producto: number, id_oferta: number, precio_orig: number, porc_descuento: number){
    console.log("Creando producto oferta");
    const nuevo ={
      "id_producto": id_producto,
      "id_oferta": id_oferta,
      "precio_orig": precio_orig,
      "porc_descuento": porc_descuento  
    }
    return this.http.post(`${environment.API_URI}/productoOferta/create`,nuevo);
  }
}
