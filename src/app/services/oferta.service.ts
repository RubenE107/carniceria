import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private http: HttpClient) { }
  lis(){
    return this.http.get(`${environment.API_URI}/showAll/`);
  }
  listOne(id: any){
    return this.http.get(`${environment.API_URI}/listOne/${id}`);

  }
  create(nombre: string, fecha_inicio: string, fecha_fin: string){
    return this.http.post(`${environment.API_URI}/create`, 
    {
      "nombre": nombre,
      "fecha_inicio": fecha_inicio,
      "fecha_fin": fecha_fin
    });
  }
  update(id: any, nombre: string, fecha_inicio: string, fecha_fin: string){
    return this.http.put(`${environment.API_URI}/update/${id}`, 
    {
      "nombre": nombre,
      "fecha_inicio": fecha_inicio,
      "fecha_fin": fecha_fin
    });

  }
  delete(id: any){
    return this.http.delete(`${environment.API_URI}/delete/${id}`);

  }
  //
  // ofertaActivas(){}
  // numOfertas(){}
  // duracionOferta(){}
  // ordenarFechasinicio(){}

  /////////Para la tabla productoOferta (para no crear otro servicio)
  listPorProductos(id:any)
  {
    return this.http.get(`${environment.API_URI}/productoOferta/listPorProducto/${id}`);
  }

  anularOferta(id:any)
  {
    return this.http.put(`${environment.API_URI}/productoOferta/anularOferta`, {"id":id});
  }
  
  
}
