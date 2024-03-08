import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuariologin = new Usuario();
  usuarioNuevo = new Usuario();
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuariologin.correo = "kio@gmail.com";
    this.usuariologin.contrasena = "asdf";
  }

  ngOnInit(): void {

  }
  logueo() {

    this.usuarioService.existe(this.usuariologin.correo, this.usuariologin.contrasena).subscribe((resusuario: any) => {
      if (resusuario.id != -1) {
        if (resusuario.id_rol === 3) {

          this.router.navigateByUrl('home/usuario')
        
        
        } else if (resusuario.id_rol === 2) {
          this.router.navigateByUrl('home/producto')
        } else {
          this.router.navigateByUrl('home/producto');
        }
        localStorage.setItem('id', resusuario.id);
        localStorage.setItem('id_rol', resusuario.id_rol);
        
      } else {
        console.log("Error, usuario o contrasena no valida");
      }
    },
      err => console.error(err)
    );
  }
  nuevoUsuario() {
    $('#modalNuevoUsuario').modal();
    $("#modalNuevoUsuario").modal("open");
  }
  guardarNuevoUsuario() {
    this.usuarioService.crear(this.usuarioNuevo.nombre,this.usuarioNuevo.correo,
       this.usuarioNuevo.telefono,this.usuarioNuevo.contrasena).subscribe((resusuario: any) =>
    {
      console.log("Se hizo la consulta");
      Swal.fire("Se ha agregado un nuevo usuario\nPor favor Inicia Sesion");
    },
    err => console.error(err)
    );
    
    $('#modalNuevoUsuario').modal('close');
  }

}
