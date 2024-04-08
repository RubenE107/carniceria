import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CorreoService {
  constructor(private http: HttpClient) { }
  enviarCorreoOferta(body: any) {
    return this.http.post(
    `${environment.API_URI_CORREOS}/enviarCorreoOferta`,
    body
  );
}
  enviarCorreo(body: any) {
    return this.http.post(
      `${environment.API_URI_CORREOS}/enviarCorreoRecuperarContrasenya`,
      body
    );
  }
  decodificarMail(token: any) {
    let dato = { token: token };
    return this.http.post(
      `${environment.API_URI_CORREOS}/decodificarMail`,
      dato
    );
  }
}
