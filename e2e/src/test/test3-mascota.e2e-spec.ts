import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import { LoginPage } from '../page/login/login.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { MascotaPage } from '../page/mascota/mascota.po';

describe('workspace-project App', () => {
    let page: AppPage;
    let login : LoginPage;
    let navBar : NavbarPage;
    let mascota : MascotaPage;
  
    beforeEach(() => {
      page = new AppPage();
      login = new LoginPage();
      navBar = new NavbarPage();
      mascota = new MascotaPage();
    });

    it('ingresamos a la pantalla de las mascotas',async()=>{
        /**
       * Iniciamos sesion
       */
         page.navigateTo();
         login.ingresarNombreUsuario('prueba2@ceiba.com.co');
         login.ingresarPassword('0123456');
         login.clickBotonLogin();
         navBar.clickBotonMascotas();
         await expect(mascota.getTitleSubPantallaText()).toEqual('Mascotas');
         await expect(mascota.mostrarNohayMascotas()).toEqual('No tiene mascotas registrada, por favor registre sus mascotas para poder agendar citas'.toUpperCase());
    });

    it('nos vamos a crear una mascota',async()=>{
        mascota.crearMascota();
        expect(browser.getCurrentUrl()).toContain('crear');
        await expect(mascota.getTitleSubPantallaText()).toEqual('Crear Mascota');
    });

    it('creamos la mascota',()=>{
        mascota.insertarNombreMascotas('tommy');
        mascota.insertarTipoMascota();
        mascota.crearActualizarMascota();
        expect(browser.getCurrentUrl()).toContain('listar');
    });

    it('eliminamos la mascota',()=>{
      mascota.eliminarMascota();
      expect(browser.getCurrentUrl()).toContain('listar');
      expect(mascota.mostrarNohayMascotas()).toEqual('No tiene mascotas registrada, por favor registre sus mascotas para poder agendar citas'.toUpperCase());
    })

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry));
      });


});