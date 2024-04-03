import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorreoService } from 'src/app/services/correo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reestablecer',
  templateUrl: './reestablecer.component.html',
  styleUrls: ['./reestablecer.component.css']
})
export class ReestablecerComponent implements OnInit {
  usuarioC : any
  contra : any
  CContra : any
  constructor(private route : ActivatedRoute, private correoService:CorreoService, private usuarioService:UsuarioService, private router:Router) {
    this.route.paramMap.subscribe(params =>
      {
        let token = params.get('token')
        console.log(token)
        this.correoService.decodificarMail(token).subscribe((resUsuario:any) =>
        {
          console.log("primeiro: ",resUsuario)
          if(resUsuario == 0)
          {
            Swal.fire("Este correo no existe Cree una cuenta");
            this.router.navigateByUrl("");
          }
          this.usuarioC = resUsuario
          console.log("este: ",this.usuarioC)
        },err => console.error(err))
      })
   }

  ngOnInit(): void {
    
  }


  reestablecer()
  {
    if(this.contra!= this.CContra)
    {
      Swal.fire("Las contraseñas no coinciden, por favor, reintente!");
      return;
    }
    console.log(this.usuarioC)
    this.usuarioService.actualizarContrasenha(this.usuarioC.correo, this.contra).subscribe((resUsuario:any)=>
    {
      
      Swal.fire("La contraseña ha cambiado exitosamente, por favor, ahora inicie seción");
      this.router.navigateByUrl("");
    })

  }
}
