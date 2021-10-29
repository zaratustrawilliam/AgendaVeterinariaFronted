import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { HomeComponent } from '@home/home.component';
import { LoginComponent } from './feature/login/components/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',component : LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [SecurityGuard]  },
  { path: 'producto', loadChildren: () => import('@producto/producto.module').then(mod => mod.ProductoModule), canActivate: [SecurityGuard]},
  { path: 'usuario',loadChildren:()=> import('./feature/usuario/usuario.module').then(mod => mod.UsuarioModule), canActivate: [SecurityGuard]},
  { path: 'mascota',loadChildren:()=> import('./feature/mascota/mascota.module').then(mod => mod.MascotaModule),canActivate: [SecurityGuard]},
  { path: 'agenda',loadChildren:()=> import('./feature/agenda/agenda.module').then(mod => mod.AgendaModule),canActivate: [SecurityGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
