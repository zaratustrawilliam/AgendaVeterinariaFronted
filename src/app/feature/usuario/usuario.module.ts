import { NgModule } from "@angular/core";

import { CrearUsuarioComponent } from "./components/crear-usuario/crear-usuario.component";
import { UsuarioComponent } from "./components/usuario/usuario.component";
import { UsuarioRoutingModule } from "./usuario-routing.module";
import { SharedModule } from "@shared/shared.module"; 
import { UsuarioService } from "./shared/service/usuario.service"; 
import { BaseUsuarioComponent } from "./components/base-usuario/base-usuario.component";

@NgModule({
    declarations:[
        CrearUsuarioComponent,
        UsuarioComponent,
        BaseUsuarioComponent
    ],
    imports:[
        UsuarioRoutingModule,
        SharedModule
    ],
    providers:[UsuarioService]
})
export class UsuarioModule {}