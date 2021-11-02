import { by, element } from 'protractor';

export class AgendaPage{

    /**
     * botones 
     */
     btnEliminarAgenda = element(by.id('eliminarAgenda'));
     btnEditarAgenda = element(by.id('editarAgenda'));
     btnCrearAgenda = element(by.id('crearAgenda'));
     btnCrearActualizarAgenda = element(by.css('.padre button'));

    getTitleSubPantallaText(){
        return element(by.css('app-root .padre h1')).getText() as Promise<string>;
    }

    mostrarNohayAgendas(){
        return element(by.css('app-root .padre .flex-outer li p')).getText() as Promise<string>;
    }

    async eliminarAgenda(){
        await this.btnEliminarAgenda.click();
    }

    async crearAgenda(){
        await this.btnCrearAgenda.click();
    }

    async crearActualizarAgenda(){
        await this.btnCrearActualizarAgenda.click();
    }
}