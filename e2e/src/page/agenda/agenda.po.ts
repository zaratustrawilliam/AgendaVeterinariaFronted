import { by, element } from 'protractor';

export class MascotaPage{

    /**
     * botones 
     */
     btnEliminarMascota = element(by.id('eliminarMascota'));
     btnEditarMascota = element(by.id('editarMascota'));
     btnCrearMascota = element(by.id('crearMascota'));
     btnCrearActualizarMascota = element(by.css('.padre button'));

    getTitleSubPantallaText(){
        return element(by.css('app-root .padre h1')).getText() as Promise<string>;
    }

    mostrarNohayAgendas(){
        return element(by.css('app-root .padre .flex-outer li p')).getText() as Promise<string>;
    }
}