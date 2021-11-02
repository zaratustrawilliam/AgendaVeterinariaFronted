import { by, element } from 'protractor';

export class MascotaPage{

    /**
     * botones 
     */
     btnEliminarMascota = element(by.id('eliminarMascota'));
     btnEditarMascota = element(by.id('editarMascota'));
     btnCrearMascota = element(by.id('crearMascota'));
     btnCrearActualizarMascota = element(by.css('.padre button'));
     /**
      * formulario
      */
     inputNombreMascota = element(by.id('nombreMascota'));
     selectOptionTipoMascota = element(by.id('tipoMascota'));

    getTitleSubPantallaText(){
        return element(by.css('app-root .padre h1')).getText() as Promise<string>;
    }

    mostrarNohayMascotas(){
        return element(by.css('app-root .padre .flex-outer li p')).getText() as Promise<string>;
    }

    async eliminarMascota(){
        await this.btnEliminarMascota.click();
    }

    async editarMascota(){
        await this.btnEditarMascota.click();
    }

    async crearMascota(){
        await this.btnCrearMascota.click();
    }

    async insertarNombreMascotas(nombreMascota){
        await this.inputNombreMascota.sendKeys(nombreMascota);
    }

    async insertarTipoMascota(){
        let opcion = this.selectOptionTipoMascota.$('option');
        await  opcion.click();
    }

    async crearActualizarMascota(){
        await this.btnCrearActualizarMascota.click();
    }
}
