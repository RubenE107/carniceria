import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private http: HttpClient) { }
  list(){
    return this.http.get(`${environment.API_URI}/ofertas/showAll/`);
  }
  listOne(id: any){
    return this.http.get(`${environment.API_URI}/ofertas/listOne/${id}`);

  }
  create(nombre: string, fecha_inicio: string, fecha_fin: string){
    return this.http.post(`${environment.API_URI}/ofertas/create`, 
    {
      "nombre": nombre,
      "fecha_inicio": fecha_inicio,
      "fecha_fin": fecha_fin
    });
  }
  update(id: any, nombre: string, fecha_inicio: string, fecha_fin: string){
    return this.http.put(`${environment.API_URI}/ofertas/update/${id}`, 
    {
      "nombre": nombre,
      "fecha_inicio": fecha_inicio,
      "fecha_fin": fecha_fin
    });

  }
  updateWithoutName(id: any, fecha_inicio: string, fecha_fin: string){
    return this.http.put(`${environment.API_URI}/ofertas/update/${id}`, 
    {
      "fecha_inicio": fecha_inicio,
      "fecha_fin": fecha_fin
    });

  }

  delete(id: any){
    return this.http.delete(`${environment.API_URI}/ofertas/delete/${id}`);

  }

  listIdProducto(){
    return this.http.get(`${environment.API_URI}/productoOferta/listIdProducto/`);
  }
  
  
  ofertaActivas(){
    return this.http.get(`${environment.API_URI}/ofertas/idproductosdeOfertasActivas/`);

  }
  numOfertas(){
    return this.http.get(`${environment.API_URI}/ofertas/numOfertas/`);
  }
  duracionOferta(){
    return this.http.get(`${environment.API_URI}/ofertas/duracionOferta/`);
  }
  ordenarFechasinicio(){
    return this.http.get(`${environment.API_URI}/ofertas/ordenarFechasInicio/`);
  }



  listPorProductos(id:any)
  {
    return this.http.get(`${environment.API_URI}/productoOferta/listPorProducto/${id}`);
  }

  anularOferta(id:any)
  {
    return this.http.put(`${environment.API_URI}/productoOferta/anularOferta`, {"id":id});
  }
  listAll_Ofertas_Producto(){
    return this.http.get(`${environment.API_URI}/ofertas/listAll_Ofertas_Producto/`);
  }

  }
  
  
