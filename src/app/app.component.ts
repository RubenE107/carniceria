import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carniceria';
  aux !: any;
  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let ruta = this.router.url;
        if (ruta == "/login" ) {
          this.aux = false;
        }else {
          
          if (ruta.indexOf("/home/reestablecer") ==0)
            this.aux=false;
          else
            this.aux = true;
        }
      }
    })
  }
}
