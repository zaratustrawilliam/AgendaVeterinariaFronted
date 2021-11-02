import { by, element } from 'protractor';

export class AgendaPage{

    /**
     * botones 
     */
     btnEliminarAgenda = element(by.id('eliminarAgenda'));
     btnEditarAgenda = element(by.id('editarAgenda'));
     btnCrearAgenda = element(by.id('crearAgenda'));
     btnCrearActualizarAgenda = element(by.css('.padre button'));

     inputNombreMascota = element(by.id('direccion'));
     selectMascota = element(by.id('mascota'));
     seleccionamosRadioBt2 = element(by.id('opcion2'));

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

    async insertarDireccion(direccion){
        await this.inputNombreMascota.sendKeys(direccion);
    }

    async seleccionarMascota(){
        let opcion = this.selectMascota.$('option');
        await  opcion.click();
    }

    async seleccionarFechaAutomatica(){
        await this.seleccionamosRadioBt2.click();
    }
}