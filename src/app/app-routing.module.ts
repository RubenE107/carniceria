import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { VentaComponent } from './components/venta/venta.component';
import { CompraComponent } from './components/compra/compra.component';
import { ReestablecerComponent } from './components/reestablecer/reestablecer.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
const routes: Routes = [
{
  path: "",
  redirectTo: "/login",
  pathMatch: "full"
},{
  path: 'login',
  component: LoginComponent,
},{
  path: 'home',
  component: HomeComponent,
  children:[
    {
      path: 'usuario',
      component: UsuarioComponent,
    },
    {
      path:'producto',
      component: ProductoComponent
    },{
      path:'carrito',
      component:CarritoComponent
    },{
      path:'perfil',
      component:PerfilComponent
    },{
      path:'venta',
      component:VentaComponent
    },{
      path:'compra',
      component:CompraComponent
    },{
      path:'reestablecer/:token',
      component:ReestablecerComponent
    },{
      path:'oferta',
      component: OfertasComponent
    },


  ]
}
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }