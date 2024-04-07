import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private http: HttpClient) { }

  ofertasActivas(){
    return this.http.get(`${environment.API_URI}/ofertasActivas/`);
  }
  numOfertas(){
    return this.http.get(`${environment.API_URI}/numOfertasActivas/`);
  }
  duracionOferta(){
    return this.http.get(`${environment.API_URI}/duracionOfertas/`);
    
  }
  ordenarfechasInicio(){
    return this.http.get(`${environment.API_URI}/ordenarFechaInicio/`);
  }
}
