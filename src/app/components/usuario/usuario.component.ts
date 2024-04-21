import { Component,OnInit } from '@angular/core';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from 'src/app/models/Usuario';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/Rol';
import Swal from 'sweetalert2';
import { RolService } from 'src/app/services/rol.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';

declare var $:any;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit{
  usuarios: Usuario[] = [];
  usuario!: Usuario;
  actualizaUsuario : Usuario = new Usuario();
  busqueda!: string;
  usuarioNuevo = new Usuario();
  roles: Rol[] =[];
  p=1
  pageSize = 7

  time= new Date().getTime();
  imgUsuario: any;
  fileToUpload: any;
  idioma : any;
  liga: string = ""

  ngOnInit(): void {
    this.rolService.list().subscribe((resRoles:any)=>{
      this.roles = resRoles;
      //console.log(this.roles);
    },
    err => console.log(err)
    );
    $(document).ready(function(){
      $('select').formSelect();
    });
     this.cambioIdiomaService.currentMsg$.subscribe(
      (msg)=>
      {
        if(msg!="")
        {
          this.idioma = msg;
        }
        else
          this.idioma = localStorage.getItem("idioma")
      }
    )
  }

  constructor(private cambioIdiomaService:CambioIdiomaService,private usuarioService: UsuarioService,private rolService:RolService, private router: Router, private translate: TranslateService, private imagenesService:ImagenesService) {
    if(localStorage.getItem("id_rol")!='3')
      router.navigateByUrl("home/producto")
    this.liga = environment.API_URI_IMAGENES + "/usuarios";
    this.list();
    

    this.usuario = new Usuario();
    this.busqueda='';
  
  }
  list(){
    this.usuarioService.list().subscribe((resUsuarios:any)=>{
      this.usuarios = resUsuarios;
    },
    err => console.log(err)
    );
  }
  Buscar(){
    if(this.busqueda!=''){
      this.usuarioService.searchByName(this.busqueda).subscribe((resUsuarios:any)=>{
        this.usuarios = resUsuarios;
      //console.log(this.usuarios);
    },
    err => console.log(err)
    );
    }
  }
  actualizarUsuario(id: any) {
    
    this.usuarioService.listOne(id).subscribe((resUsuario:any)=>{
      this.usuario = resUsuario;
      this.actualizaUsuario.correo = resUsuario.correo;

      $('#modalModificaUsuario').modal();
      $("#modalModificaUsuario").modal("open");
      //console.log(this.usuario);
    },
    err => console.log(err)
    );
    
  }
  
  guardarActualizarUsuario(){
   
    // Elimina el usuario de la lista de usuarios
    this.usuarios = this.usuarios.filter(usuario => usuario.id !==this.usuario.id);
    console.log(this.usuarios);
    this.usuarioService.ValidarCorreo(this.usuario.correo).subscribe((resusuario: any) => {
     
     
      if (resusuario.correo_existe ==1 && this.usuario.correo != this.actualizaUsuario.correo) {
        Swal.fire(this.translate.instant("Este correo ya existe por favor agrega uno nuevo\n"));
      }else{
        this.usuarioService.actualizar(this.usuario).subscribe((resUsuario: any) => {
          $('#modalModificaUsuario').modal('close');
        },
          err => console.log(err)
        );
        
      }
    },
      err => console.error(err)
    );
    this.usuarioService.listOne(this.usuario.id).subscribe((resUsuario:any)=>{
      this.usuario = resUsuario;
    },
    err => console.log(err)
    );
    this.usuarios.push(this.usuario);   
  }
  eliminarUsuario(id: any) {
    //console.log('Click en eliminar usuario');
    //console.log('Identificador del usuario: ', id);
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
        this.usuarioService.eliminarUsuario(id).subscribe(
          (resusuario: any) => {
            //console.log('resusuario: ', resusuario);
            if (Number(localStorage.getItem("id")) == this.usuario.id)
            {
              
            }

            this.usuarioService.list().subscribe(
              (resusuario: any) => {
                this.usuarios = resusuario;
                //console.log(resusuario);
                //console.log(this.usuarios);
                this.usuario= new Usuario();
              },
              (err) => console.error(err)
            );
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

  mostrarImagen(id: any) {
    this.usuarioService.listOne(id).subscribe(
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
          if(this.fileToUpload!=null) this.usuario.img=1
          this.guardaModifica()
          this.imgUsuario = blob;
          // Actualizar la variable 'liga' después de cargar la imagen
          this.liga = environment.API_URI_IMAGENES + "/usuarios";
          this.time = new Date().getTime();
          
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


