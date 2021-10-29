import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConsultarMascotaComponent } from "./component/consultar-mascota/consultar-mascota.component";
import { CrearMascotaComponent } from "./component/crear-mascota/crear-mascota.component";
import { MascotasComponent } from "./component/mascota/mascota.component";

const routes:Routes = [
    {
        path:'',
        component:MascotasComponent,
        children:[
            {
                path:'listar',
                component:ConsultarMascotaComponent
            },
            {
                path:'crear',
                component:CrearMascotaComponent 
            },
            {
                path:'actualizar/:idMascota',
                component:CrearMascotaComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class MascotaRoutingModule{}
