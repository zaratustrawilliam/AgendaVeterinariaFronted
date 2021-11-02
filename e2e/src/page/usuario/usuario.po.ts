import { by, element } from 'protractor';

export class UsuarioPage{

    /**
     * labels 
     */
    parrafoNombreUsuario = element(by.id('nombreUsuarioDisplay'));
    parrafoIdUsuario = element(by.id('idUsuarioDisplay'));
    parrafoFechaCreacion = element(by.id('fechaCreacionDisplay'));
    /**
     * botones
     */
    btnCerrarCesion = element(by.id('btnCerrarCesion'));
    btnEliminarUsuario = element(by.id('btnEliminarUsuario'));
    btnActualizarUsuario = element(by.id('btnActualizarUsuario'));
    btnCrearUsuario = element(by.css('app-root .padre button'));

    /**
     * Inputs 
     */
    inputNombreUsuario = element(by.css('app-root .padre #nombreUsuario'));
    inputNombrePassword = element(by.css('app-root .padre #claveUsuario'));

    mostrarNombreUsuario(){
        return this.parrafoNombreUsuario.getText() as Promise<string>;
    }

    mostrarIdUsuario(){
        return this.parrafoIdUsuario.getText() as Promise<string>;
    }

    mostrarFecha(){
        return this.parrafoFechaCreacion.getText() as Promise<string>;
    }

    getTitleSubPantallaText(){
        return element(by.css('app-root .padre h1')).getText() as Promise<string>;
    }

    async cerrarCesion(){
        await this.btnCerrarCesion.click();
    }

    async eliminarUsuario(){
        await this.btnEliminarUsuario.click();
    }

    async actualizarUsuario(){
        await this.btnActualizarUsuario.click();
    }

    async crearActualizarUsuario(){
        await this.btnCrearUsuario.click();
    }

    async insertarNombreUsuario(nombreUsuario){
        await this.inputNombreUsuario.sendKeys(nombreUsuario);
    }

    async insertarPassword(password){
        await this.inputNombrePassword.sendKeys(password);
    }
}