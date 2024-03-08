import { Component,OnInit } from '@angular/core';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from 'src/app/models/Usuario';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/Rol';
import Swal from 'sweetalert2';
import { RolService } from 'src/app/services/rol.service';
declare var $:any;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit{
  usuarios: Usuario[] = [];
  usuario!: Usuario;
  busqueda!: string;
  usuarioNuevo = new Usuario();
  roles: Rol[] =[];

  ngOnInit(): void {
    this.rolService.list().subscribe((resRoles:any)=>{
      this.roles = resRoles;
      console.log(this.roles);
    },
    err => console.log(err)
    );
    $(document).ready(function(){
      $('select').formSelect();
    });
  }

  constructor(private usuarioService: UsuarioService,private rolService:RolService, private router: Router) {
    if(localStorage.getItem("id_rol")!='3')
      router.navigateByUrl("home/producto")
    this.list();
    

    this.usuario = new Usuario();
    this.busqueda='';
  
  }
  list(){
    this.usuarioService.list().subscribe((resUsuarios:any)=>{
      this.usuarios = resUsuarios;
      console.log(this.usuarios);
    },
    err => console.log(err)
    );
  }
  Buscar(){
    if(this.busqueda!=''){
      this.usuarioService.searchByName(this.busqueda).subscribe((resUsuarios:any)=>{
        this.usuarios = resUsuarios;
      console.log(this.usuarios);
    },
    err => console.log(err)
    );
    }
  }
  actualizarUsuario(id: any) {
    
    this.usuarioService.listOne(id).subscribe((resUsuario:any)=>{
      this.usuario = resUsuario;
      $('#modalModificaUsuario').modal();
      $("#modalModificaUsuario").modal("open");
      console.log(this.usuario);
    },
    err => console.log(err)
    );
  }
  
  guardarActualizarUsuario(){
    this.usuarioService.actualizar(this.usuario).subscribe((resusuario: any) =>
    {
      console.log(this.usuario);
      $('#modalModificaUsuario').modal('close');
      this.list();
    },
    err => console.error(err)
    );
  }
  eliminarUsuario(id: any) {
    console.log('Click en eliminar usuario');
    console.log('Identificador del usuario: ', id);
    Swal.fire({
      title: '¿Estás seguro bro?',
      text: 'No es posible revertir este!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe(
          (resusuario: any) => {
            console.log('resusuario: ', resusuario);
            this.usuarioService.list().subscribe(
              (resusuario: any) => {
                this.usuarios = resusuario;
                //console.log(resusuario);
                console.log(this.usuarios);
                this.usuario= new Usuario();
              },
              (err) => console.error(err)
            );
          },
          (err) => console.error(err)
        );

        Swal.fire({
          title: 'Eliminado!',
          text: 'Tu archivo ha sido eliminado.',
          icon: 'success',
        });
      }
    });
  }

  metodoPrueba() {
    console.log(this.usuarios);
  }
  nuevoUsuario() {
    $('#modalNuevoUsuario').modal();
    $("#modalNuevoUsuario").modal("open");
  }
  guardarNuevoUsuario() {
    this.usuarioService.crear(this.usuarioNuevo.nombre,this.usuarioNuevo.correo,
       this.usuarioNuevo.telefono,this.usuarioNuevo.contrasena).subscribe((resusuario: any) =>
    {
      this.list()
    },
    err => console.error(err)
    );
    
    $('#modalNuevoUsuario').modal('close');
  }
}
