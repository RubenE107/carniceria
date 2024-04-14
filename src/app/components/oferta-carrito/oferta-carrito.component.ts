import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oferta-carrito',
  templateUrl: './oferta-carrito.component.html',
  styleUrls: ['./oferta-carrito.component.css']
})
export class OfertaCarritoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private carritoService: CarritoService, private router: Router, private translate: TranslateService) {
    if (localStorage.getItem("id") == null) {
      Swal.fire(this.translate.instant("Por favor, inicia sesión"));
      router.navigateByUrl("");
      return;
    }


    this.route.paramMap.subscribe(params => {
      let producto = params.get('id');
      carritoService.crear(1, producto, localStorage.getItem("id")).subscribe((resCarro) => {
        Swal.fire({
          title: this.translate.instant("Bien ahí"),
          text: this.translate.instant("Felicidades, ha aprovechado la oferta"),
          icon: "success"
        });
        router.navigateByUrl("/home/carrito");
      })


    }
    )
  }

  ngOnInit(): void {
  }

}
