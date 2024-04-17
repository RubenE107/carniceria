import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CorreoService } from 'src/app/services/correo.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuariologin = new Usuario();
  usuarioNuevo = new Usuario();
  usuarioRestablecer = new Usuario();
  constructor(private correoService: CorreoService, private usuarioService: UsuarioService, private router: Router, private translate: TranslateService) {
    this.usuariologin.correo = "kio@gmail.com";
    this.usuariologin.contrasena = "asdf";

    if (localStorage.getItem("id") != null) {
      if (Number(localStorage.getItem("id_rol")) === 3) {
        this.router.navigateByUrl("/home/venta");
      }
      else {
        this.router.navigateByUrl("/home/producto");
      }
    }

    if (localStorage.getItem("idioma") != null) {
      if (localStorage.getItem("idioma") == "1") {
        translate.use("en");
      }
      else if (localStorage.getItem("idioma") == "2") {
        translate.use("es");
      }
    }
    else {
      localStorage.setItem("idioma", "2")
    }
  }

  ngOnInit(): void {
    $(".dropdown-trigger").dropdown();
  }
  logueo() {

    this.usuarioService.existe(this.usuariologin.correo, this.usuariologin.contrasena).subscribe((resusuario: any) => {
      if (resusuario.id != -1) {
        if (resusuario.id_rol === 3) {

          this.router.navigateByUrl('home/venta')


        } else if (resusuario.id_rol === 2) {
          this.router.navigateByUrl('home/producto')
        } else {
          this.router.navigateByUrl('home/producto');
        }
        localStorage.setItem('id', resusuario.id);
        localStorage.setItem('id_rol', resusuario.id_rol);

      } else {
        console.log("Error, usuario o contrasena no valida");
        Swal.fire({
          title: this.translate.instant("Credenciales incorrectas"),
          text: this.translate.instant("El correo y/o la contraseña ingresados son incorrectos.\nInténtelo nuevamente."),
          icon: "error"
        })
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
    this.usuarioService.ValidarCorreo(this.usuarioNuevo.correo).subscribe((resusuario: any) => {

      if (resusuario.correo_existe == 1) {
        Swal.fire(this.translate.instant("Este correo ya existe por favor agrega uno nuevo\n"));
        console.log("el correo ya existe")
      }else{
        this.usuarioService.crear(this.usuarioNuevo.nombre, this.usuarioNuevo.correo,
          this.usuarioNuevo.telefono, this.usuarioNuevo.contrasena).subscribe((resusuario: any) => {
            console.log("Se hizo la consulta");
            $('#modalNuevoUsuario').modal('close');
            Swal.fire(this.translate.instant("Se ha agregado un nuevo usuario.\nPor favor, inicia sesión."));
          },
            err => console.error(err)
          );
    
      }
    },
      err => console.error(err)
    );

    
  }
  Modalrestablecer() {
    $('#modalRestablecerContrasena').modal({ dismissible: false });
    $("#modalRestablecerContrasena").modal("open");
  }
  restablecerContrasena(correo: string) {
    console.log("cambiando contrasena");
    console.log(correo);
    /*var message: any ={};
    message = {
    from: "equipWed@hotmail.com",
    to: correo,
    bcc: "",
    subject: "Probando ando",
    attachment: [
    { data: `¡¡Te damos la más cordial bienvenida !!`, alternative: true }
    ]
    };
    console.log(message);*/
    this.correoService.enviarCorreo({ "correo": correo }).subscribe((resusuario: any) => { },
      err => console.error(err));
    console.log("Se envio el correo");
  }

  setIdioma(idioma: any) {
    if (idioma == 1) {
      this.translate.use("en");
      localStorage.setItem("idioma", "1");
    }
    if (idioma == 2) {
      this.translate.use("es");
      localStorage.setItem("idioma", "2");
    }
  }

}
