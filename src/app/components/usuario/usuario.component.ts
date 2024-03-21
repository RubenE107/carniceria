import { Component,OnInit  } from '@angular/core';
import { UsuarioService} from './../../services/usuario.service';
import { Usuario } from 'src/app/models/Usuario';
import Swal from 'sweetalert2';
import { RolesService } from 'src/app/services/roles.service';
import { Rol } from 'src/app/models/Rol';
declare var $: any;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  usuarios : Usuario [] = [];
  usuario: Usuario = new Usuario();
  usuarioNuevo: Usuario = new Usuario();
  roles : Rol [] = []

  
  constructor(private usuarioService: UsuarioService, private rolesService : RolesService) {
  }
  ngOnInit(): void {
      this.usuarioService.list().subscribe((resUsuarios: any) => {
          this.usuarios = resUsuarios;
          this.rolesService.list().subscribe((resRoles: any) => {
            this.roles = resRoles;
            console.log("roles:", this.roles);
          }, err => console.error(err));
      }, err => console.error(err));
  }

  crearUsuario() {
    this.usuarioNuevo = new Usuario();
    console.log("Usuario Nuevo")
    $('#modalCrearUsuario').modal();
    $("#modalCrearUsuario").modal("open");
}

guardarNuevoUsuario(){
  console.log("GuardandoUsuario")
  this.usuarioService.crearUsuario(this.usuarioNuevo).subscribe((res) => {
      $('#modalCrearUsuario').modal('close');
      this.usuarioService.list().subscribe((resUsuarios: any) => {
          this.usuarios = resUsuarios;
      }, err => console.error(err));
      Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Plan Actualizado'
      })
  }, err => console.error(err));
}


actualizarUsuario(id_usuario: any) {
  this.usuarioService.listOne(id_usuario).subscribe((resUsuario: any) => {
      this.usuario = resUsuario;
      console.log(this.usuario)
      $('#modalModificarUsuario').modal();
      $("#modalModificarUsuario").modal("open");
  }, err => console.error(err));
}
guardarActualizarUsuario() {
  this.usuarioService.actualizarUsuario(this.usuario).subscribe((res) => {
      $('#modalModificarUsuario').modal('close');
      this.usuarioService.list().subscribe((resUsuarios: any) => {
          this.usuarios = resUsuarios;
      }, err => console.error(err));
      Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Plan Actualizado'
      })
  }, err => console.error(err));
}

  eliminarUsuario(id : any){
    console.log("Click en eliminar usuario");
    console.log("Identificador del usuario: ",id);
    Swal.fire({
      title: "¿Estás seguro bro?",
      text: "No es posible revertir este!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, quiero eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe((resusuario: any) =>
        {
         console.log("resusuario: ", resusuario);
         this.usuarioService.list().subscribe((resusuario: any) =>
         {
           this.usuarios = resusuario;  
           //console.log(resusuario);
           console.log(this.usuarios)
         },
         err => console.error(err)
         );
        },
        err => console.error(err)
        );


        Swal.fire({
          title: "Eliminado!",
          text: "Tu archivo ha sido eliminado.",
          icon: "success"
        });
      }
    });

  }

  metodoPrueba(){
    console.log(this.usuarios);
  }
}
