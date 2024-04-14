import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CorreoService } from 'src/app/services/correo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-reestablecer',
  templateUrl: './reestablecer.component.html',
  styleUrls: ['./reestablecer.component.css']
})
export class ReestablecerComponent implements OnInit {
  usuarioC : any
  contra : any
  CContra : any
  constructor(private route : ActivatedRoute, private correoService:CorreoService, private usuarioService:UsuarioService, private router:Router, private translate: TranslateService) {
    this.route.paramMap.subscribe(params =>
      {
        let token = params.get('token')
        console.log(token)
        this.correoService.decodificarMail(token).subscribe((resUsuario:any) =>
        {
          console.log("primeiro: ",resUsuario)
          if(resUsuario == 0)
          {
            Swal.fire(this.translate.instant("Ha ocurrido un error"));
            this.router.navigateByUrl("");
          }
          this.usuarioC = resUsuario
          console.log("este: ",this.usuarioC)
        },err => console.error(err))
      })
   }

  ngOnInit(): void {
    $(".dropdown-trigger").dropdown();
  }


  reestablecer()
  {
    if(this.contra!= this.CContra)
    {
      Swal.fire(this.translate.instant("Las contraseñas no coinciden.\nPor favor, intente de nuevo."));
      return;
    }
    console.log(this.usuarioC)
    this.usuarioService.actualizarContrasenha(this.usuarioC.correo, this.contra).subscribe((resUsuario:any)=>
    {
      Swal.fire(this.translate.instant("La contraseña ha cambiado exitosamente.\nPor favor, ahora inicie sesión."));
      this.router.navigateByUrl("");
    })

  }

  setIdioma(idioma: any) {
    if (idioma == 1) {
      this.translate.use("en");
    }
    if (idioma == 2) {
      this.translate.use("es");
    }
  }
}
