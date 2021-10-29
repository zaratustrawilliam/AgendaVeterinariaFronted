import { NgModule } from "@angular/core";
import { Routes, RouterModule} from '@angular/router';
import { BaseUsuarioComponent } from "./components/base-usuario/base-usuario.component";
import { CrearUsuarioComponent } from "./components/crear-usuario/crear-usuario.component";
import { UsuarioComponent } from "./components/usuario/usuario.component";

const routes: Routes = [
    {
        path:'',
        component:BaseUsuarioComponent,
        children:[
            {
                path:'crear',
                component:CrearUsuarioComponent 
            },{
                path:'perfil',
                component:UsuarioComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class UsuarioRoutingModule {}