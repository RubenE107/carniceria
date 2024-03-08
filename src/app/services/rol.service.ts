import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient){
    
   }

  list() {
    return this.http.get(`${environment.API_URI}/roles/showAll`);
  }
  listOne(id: any){
    return this.http.get(`${environment.API_URI}/roles/listOne/${id}`);
  }
  NuevoRol(nombre:any, descripcion: any){
    return this.http.post(`${environment.API_URI}/roles/create/`,{"nombre":nombre,"descripcion":descripcion});

  }
}
