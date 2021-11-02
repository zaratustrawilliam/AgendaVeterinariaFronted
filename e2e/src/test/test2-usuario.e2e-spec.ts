import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import { LoginPage } from '../page/login/login.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { UsuarioPage } from '../page/usuario/usuario.po';

describe('workspace-project App', () => {
    let page: AppPage;
    let login : LoginPage;
    let navBar : NavbarPage;
    let usuario : UsuarioPage;
  
    beforeEach(() => {
      page = new AppPage();
      login = new LoginPage();
      navBar = new NavbarPage();
      usuario = new UsuarioPage();
    });

    it('Ingresamos a la pantalla del usuario',async()=>{

        /**
       * Iniciamos sesion
       */
        page.navigateTo();
        login.ingresarNombreUsuario('prueba2@ceiba.com.co');
        login.ingresarPassword('0123456');
        login.clickBotonLogin();
        navBar.clickBotonUsuarios();
        await expect(usuario.getTitleSubPantallaText()).toEqual('Usuario');
        await expect(usuario.mostrarIdUsuario()).not.toContain('-1');
        await expect(usuario.mostrarNombreUsuario()).toContain('prueba2@ceiba.com.co'.toUpperCase());
        await expect(usuario.mostrarFecha()).not.toContain('null');
    });

    it('cerramos la sesion del usuario',()=>{
        usuario.cerrarCesion();
        expect(browser.getCurrentUrl()).toContain('login');
    });

    it('vamos al crear usuario',()=>{
        login.clickCrearUsuario();
        expect(browser.getCurrentUrl()).toContain('crear');
    });

    it('validamos que estemos en el crear usuario', async ()=>{
        await expect(usuario.getTitleSubPantallaText()).toEqual('Crear usuario');
    });

    it('creamos un usuario',()=>{
        usuario.insertarNombreUsuario('ceiba4@prueba.com');
        usuario.insertarPassword('0147852');
        usuario.crearActualizarUsuario();
        expect(browser.getCurrentUrl()).toContain('home');
    });

    it('vamos a actualizar el usuario',()=>{
        navBar.clickBotonUsuarios();
        usuario.actualizarUsuario();
        expect(browser.getCurrentUrl()).toContain('crear');
    });

    it('validamos que estemos en el actualizar usuario', async ()=>{
        await expect(usuario.getTitleSubPantallaText()).toEqual('Actualizar Usuario');
    });

    it('actualizamos el usuario',async()=>{
        usuario.insertarPassword('0147863');
        usuario.crearActualizarUsuario();
        expect(browser.getCurrentUrl()).toContain('perfil');
    });

    it('eliminamos el usuario',()=>{
        usuario.eliminarUsuario();
        expect(browser.getCurrentUrl()).toContain('login');
    });
    

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry));
      });

});
