import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class UsuarioService {
constructor(private http: HttpClient) {
    
}

historial(id:any){
  
  return this.http.get(`${environment.API_URI}/users/historial/${id}`);

}

list() {
  return this.http.get(`${environment.API_URI}/users/showAll`);
}
listOne(id: any){
  return this.http.get(`${environment.API_URI}/users/listOne/${id}`);
}
crear(nombre: any, correo: any, telefono:any, contra: any){
  const nuevo ={
    "nombre":nombre,
    "id_rol":1,
    "correo":correo,
    "telefono":telefono,
    "contra":contra    
  }
  return this.http.post(`${environment.API_URI}/users/create`,nuevo);
}
searchByName(nombre: any){
  return this.http.post(`${environment.API_URI}/users/buscarNombre`,{"nombre":nombre});
}

existe(correo : any, password : any){ 
  return this.http.post(`${environment.API_URI}/users/ValidarUsuario`,
  {"correo":correo, "contra":password});
}
actualizar(usuario: any){
  const nuevo ={
    "nombre":usuario.nombre,
    "id_rol":usuario.id_rol,
    "correo":usuario.correo,
    "telefono":usuario.telefono,
    "contra":usuario.contra,
    "img": usuario.img    
  }
  return this.http.put(`${environment.API_URI}/users/update/${usuario.id}`,nuevo);
}
eliminarUsuario(id : any){ 
  return this.http.delete(`${environment.API_URI}/users/delete/${id}`);
}
ValidarCorreo( correo: any){
  return this.http.post(`${environment.API_URI}/users/validarCorreo`, {"correo":correo});
}
actualizarContrasenha(correo:any, contra:any)
{
  return this.http.put(`${environment.API_URI}/users/nuevaContra`, {"correo":correo, "contra":contra});
}


}