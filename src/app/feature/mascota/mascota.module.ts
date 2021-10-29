import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { ConsultarMascotaComponent } from "./component/consultar-mascota/consultar-mascota.component";
import { CrearMascotaComponent } from "./component/crear-mascota/crear-mascota.component";
import { MascotasComponent } from "./component/mascota/mascota.component";
import { MascotaRoutingModule } from "./mascota-routing.module";
import { MascotasService } from "./shared/service/mascotas.service";

@NgModule({
    declarations:[
        MascotasComponent,
        ConsultarMascotaComponent,
        CrearMascotaComponent
    ],
    imports:[
        MascotaRoutingModule,
        SharedModule
    ],
    providers:[MascotasService]
})
export class MascotaModule {}