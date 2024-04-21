import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Usuario } from 'src/app/models/Usuario';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';



import Swal from 'sweetalert2';
declare var $: any;;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario!: Usuario;
  actualizaUsuario: Usuario = new Usuario();
  contra1: string = '';
  contra2: string = '';
  newContra: string = '';
  flag = 0
  id: any = '';
  liga: string = '';

  imgUsuario: any;
  fileToUpload: any;
  constructor(private usuarioService: UsuarioService, private router: Router, private translate: TranslateService, private imagenesService: ImagenesService) {
    this.list()
    this.imagen()
  }

  ngOnInit(): void {
    this.imagen()
  }

  list() {
    this.usuarioService.listOne(localStorage.getItem("id")).subscribe((resUsuario: any) => {

      //this.usuarios.push(resUsuario)
      this.usuario = resUsuario
      this.flag = 1;
      //console.log(this.usuarios)
    },
      err => console.log(err)
    );
  }
  modificarUsuario(id: any) {
    this.usuarioService.listOne(localStorage.getItem("id")).subscribe((resUsuario: any) => {
      this.actualizaUsuario = resUsuario;
    },
      err => console.log(err)
    );


    $('#modalActualiza').modal();
    $("#modalActualiza").modal("open");
  }
  cambiaUsuario() {
    this.usuarioService.ValidarCorreo(this.actualizaUsuario.correo).subscribe((resusuario: any) => {

      if (resusuario.correo_existe ==1 && this.usuario.correo != this.actualizaUsuario.correo) {
        Swal.fire(this.translate.instant("Este correo ya existe por favor agrega uno nuevo\n"));
      }else{
        this.usuarioService.actualizar(this.actualizaUsuario).subscribe((resUsuario: any) => {
          this.usuario = this.actualizaUsuario;
          $('#modalActualiza').modal('close');
        },
          err => console.log(err)
        );
    
      }
    },
      err => console.error(err)
    );

   

  }
  eliminar() {
    Swal.fire({
      title: this.translate.instant('¿Estás seguro, bro?'),
      text: this.translate.instant('¡No es posible revertir esta acción!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('¡Sí, quiero eliminarlo!'),
      cancelButtonText: this.translate.instant('Cancelar')
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(this.usuario.id).subscribe(
          (resusuario: any) => {
            localStorage.removeItem("id");
            localStorage.removeItem("id_rol");
            this.router.navigateByUrl("/");
          },
          (err) => console.error(err)
        );

        Swal.fire({
          title: this.translate.instant('¡Eliminado!'),
          text: this.translate.instant('El usuario ha sido eliminado.'),
          icon: 'success',
        });
      }
    });
  }
  modificarContra() {

    $('#modalContra').modal();
    $("#modalContra").modal("open");
  }
  cambiaContra() {
    $('#modalContra').modal('close');

  }




  imagen() {
    this.usuarioService.listOne(localStorage.getItem('id')).subscribe((resusuario: any) => {
      let user: Usuario = resusuario;

      if (user.img == 0) {
        if (user.id_rol == 1)
          this.liga = environment.API_URI_IMAGENES + "/usuarios/cliente.jpg"
        else if (user.id_rol == 2)
          this.liga = environment.API_URI_IMAGENES + "/usuarios/empleado.jpg"   
        else if (user.id_rol == 3)
          this.liga = environment.API_URI_IMAGENES + "/usuarios/admin.jpg"
        }
      else
        this.liga = environment.API_URI_IMAGENES + "/usuarios/" + user.id + ".jpg?"+ new Date().getTime();

      // console.log(this.liga)
    })
  }

  mostrarImagen() {
    this.usuarioService.listOne(localStorage.getItem('id')).subscribe(
      (resusuario: any) => {
        this.usuario = resusuario;

        //console.log(this.usuario)
        $('#Imagen').modal();
        $("#Imagen").modal("open");
      },
      (err) => console.error(err)
    );
  }

  cargandoImagen(archivo: any) {
    this.imgUsuario = null;
    this.fileToUpload = archivo.files.item(0);
  }


  ActualizaImagen() {
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
      console.log("convirtiendo imagen")
      console.log(this.liga);
      this.imagenesService.guardarImagen(this.usuario.id, "usuarios", blob).subscribe(
        (res: any) => {
          if (this.fileToUpload != null) this.usuario.img = 1
          this.guardaModifica()
          this.imgUsuario = blob;
          // Actualizar la variable 'liga' después de cargar la imagen
          this.liga = ""
          this.imagen();

        },
        err => console.error(err));
    });
  }

  guardaModifica() {
    this.usuarioService.actualizar(this.usuario).subscribe((resusuario: any) => {
      this.list();
    },
      err => console.error(err)
    );

    this.list();
  }

  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) { //Espera a que se cargue la img
      reader.onload = (function (thefile) {
        return function (e) {
          // console.log(e.target?.result)
          resolve(e.target?.result);
        };

      })(file);
      reader.readAsDataURL(file);
    });

  }

}



