import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $:any;;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  aux !:any;
  constructor(private router: Router) {
    this.aux = localStorage.getItem("id_rol") 


   }
   ngOnInit(): void {
    $(document).ready(function(){
      $('select').formSelect();
    });
   }
   usuario(){
    this.router.navigateByUrl('/home/usuario')
   }
   producto(){
    this.router.navigateByUrl('/home/producto')
   }
   carrito(){
    this.router.navigateByUrl('/home/carrito')
   }
   compras(){
    this.router.navigateByUrl('/home/compra')
   }
   venta(){
    this.router.navigateByUrl('/home/venta')
   }
   prefil(){
    this.router.navigateByUrl('/home/perfil')
   }


   cerrarSesion(){
    Swal.fire({
      title: '¿Estás seguro bro?',
      text: 'Tendras que volver a iniciar sesion',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero cerrar sesion!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigateByUrl('/')
        Swal.fire({
          title: 'Bye!',
          text: 'Tu sesion se ha cerrado',
          icon: 'success',
        });
      }
    });
   }

}
