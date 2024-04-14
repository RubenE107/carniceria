import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare var $:any;;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarios :Usuario [] = [];
  usuario!: Usuario;
  actualizaUsuario!:Usuario;
  contra1 : string = '';
  contra2 :string ='';
  newContra: string = '';
  flag=0;
  constructor(private usuarioService: UsuarioService, private router: Router, private translate: TranslateService) {
    this.list()
    console.log(localStorage.getItem("id_rol"))
   }

  ngOnInit(): void {
    
  }

  list(){
    this.usuarioService.listOne(localStorage.getItem("id")).subscribe((resUsuario:any)=>{
      
      this.usuarios.push(resUsuario);
      this.flag=1
      console.log(this.usuarios)
    },
    err => console.log(err)
    );
  }
  modificarUsuario(id: any){
    this.usuarioService.listOne(localStorage.getItem("id")).subscribe((resUsuario:any)=>{
      this.actualizaUsuario = resUsuario;
    },
    err => console.log(err)
    );


    $('#modalActualiza').modal();
    $("#modalActualiza").modal("open");
  }
  cambiaUsuario(){
    this.usuarioService.actualizar(this.actualizaUsuario).subscribe((resUsuario:any)=>{
      this.usuarios[0] = this.actualizaUsuario;
      $('#modalActualiza').modal('close');
    },
    err => console.log(err)
    );

  }
  eliminar(){
    Swal.fire({
      title: this.translate.instant('¿Estás seguro, bro?'),
      text: this.translate.instant('¡No es posible revertir esta acción!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('¡Sí, quiero eliminarlo!'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(this.usuarios[0].id).subscribe(
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
  modificarContra(){
    
    $('#modalContra').modal();
    $("#modalContra").modal("open");
  }
  cambiaContra(){
    $('#modalContra').modal('close');

  }
}
