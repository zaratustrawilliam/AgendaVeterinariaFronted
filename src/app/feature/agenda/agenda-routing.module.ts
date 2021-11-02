import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgendaComponent } from "./components/agenda/agenda.component";
import { ConsultarAgendaComponent } from "./components/consultar-agenda.component.html/consultar-agenda.component";
import { CrearAgendaComponent } from "./components/crear-agenda/crear-agenda.component";

const routes:Routes = [
    {
        path:'',
        component:AgendaComponent,

        children:[
            {
                path:'listar',
                component:ConsultarAgendaComponent,
            },
            {
                path:'crear',
                component:CrearAgendaComponent 
            },
            {
                path:'actualizar/:idAgenda',
                component:CrearAgendaComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AgendaRoutingModule{}

