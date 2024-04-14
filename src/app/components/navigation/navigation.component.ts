import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  aux: any;
  currentPage: any = this.router.url.split('/')[2]; // Variable para mantener la página activa

  constructor(private router: Router, private translate: TranslateService) {
    this.aux = localStorage.getItem("id_rol");
  }

  ngOnInit(): void {
    // Inicializar componentes de Materialize al cargar la página
    $(document).ready(function () {
      $('select').formSelect();
      $(".dropdown-trigger").dropdown();
    });

    // Escuchar cambios de ruta para actualizar la página activa
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActivePage();
      }
    });
  }

  // Método para actualizar la página activa
  updateActivePage(): void {
    const path = this.router.url.split('/')[2]; // Obtener el segmento de la URL de la página actual
    switch (path) {
      case 'usuario':
        this.currentPage = 'usuario';
        break;
      case 'producto':
        this.currentPage = 'producto';
        break;
      case 'carrito':
        this.currentPage = 'carrito';
        break;
      case 'compra':
        this.currentPage = 'compra';
        break;
      case 'venta':
        this.currentPage = 'venta';
        break;
      case 'perfil':
        this.currentPage = 'perfil';
        break;
      case 'oferta':
        this.currentPage = 'oferta';
        break;
      default:
        this.currentPage = ''; // Página no encontrada o inicial
        break;
    }
  }

  // Métodos de navegación
  usuario(): void {
    this.router.navigateByUrl('/home/usuario');
  }

  producto(): void {
    this.router.navigateByUrl('/home/producto');
  }

  carrito(): void {
    this.router.navigateByUrl('/home/carrito');
  }

  compras(): void {
    this.router.navigateByUrl('/home/compra');
  }

  venta(): void {
    this.router.navigateByUrl('/home/venta');
  }

  perfil(): void {
    this.router.navigateByUrl('/home/perfil');
  }

  ofertas(): void {
    this.router.navigateByUrl('/home/oferta');
  }

  cerrarSesion(): void {
    Swal.fire({
      title: this.translate.instant('¿Estás seguro?'),
      text: this.translate.instant('Tendrás que volver a iniciar sesión'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('Sí, quiero cerrar sesión'),
      cancelButtonText: this.translate.instant('Cancelar')
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigateByUrl('/');
        Swal.fire({
          title: this.translate.instant('¡Hasta luego!'),
          text: this.translate.instant('Tu sesión se ha cerrado.'),
          icon: 'success'
        });
      }
    });
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
