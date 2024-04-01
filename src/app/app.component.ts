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
        //this.aux = localStorage.getItem("id");
        if (this.router.url == "/login") {
          this.aux = false;
        }
        else {
          this.aux = true;
        }
      }
    })
  }
}
