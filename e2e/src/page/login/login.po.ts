import { by, element } from 'protractor';

export class LoginPage{
    
    inputTextNombreUsuario  = element(by.id('nombreUsuarioLogin'));
    inputTextPassword = element(by.id('claveUsuarioLogin'));
    btnLogin = element(by.id('btnLogin'));
    linkCrearUsuario = element(by.id('linkCrearUsuario'));

    async ingresarNombreUsuario(nombreUsuario){
        await this.inputTextNombreUsuario.sendKeys(nombreUsuario);
    }

    async ingresarPassword(password){
        await this.inputTextPassword.sendKeys(password);
    }

    async clickBotonLogin(){
        await this.btnLogin.click();
    }

    async clickCrearUsuario(){
        await this.linkCrearUsuario.click();
    }
}