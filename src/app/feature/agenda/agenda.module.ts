import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { AgendaRoutingModule } from "./agenda-routing.module";
import { AgendaComponent } from "./components/agenda/agenda.component";
import { ConsultarAgendaComponent } from "./components/consultar-agenda.component.html/consultar-agenda.component";
import { CrearAgendaComponent } from "./components/crear-agenda/crear-agenda.component";
import { AgendaService } from "./share/service/agenda.service";

@NgModule({
    declarations:[
        AgendaComponent,
        ConsultarAgendaComponent,
        CrearAgendaComponent
    ],
    imports:[
        AgendaRoutingModule,
        SharedModule
    ],
    providers:[AgendaService]
})
export class AgendaModule {}