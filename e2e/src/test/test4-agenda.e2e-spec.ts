import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import { LoginPage } from '../page/login/login.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AgendaPage } from '../page/agenda/agenda.po';
import { MascotaPage } from '../page/mascota/mascota.po';

describe('workspace-project App', () => {
    let page: AppPage;
    let login: LoginPage;
    let navBar: NavbarPage;
    let agenda: AgendaPage;
    let mascota: MascotaPage;

    beforeEach(() => {
        page = new AppPage();
        login = new LoginPage();
        navBar = new NavbarPage();
        agenda = new AgendaPage();
        mascota = new MascotaPage();
    });

    it('ingresamos a la pantalla de las agenda', async () => {
        /**
       * Iniciamos sesion
       */
        page.navigateTo();
        login.ingresarNombreUsuario('prueba2@ceiba.com.co');
        login.ingresarPassword('0123456');
        login.clickBotonLogin();
        navBar.clickBotonMascotas();
        mascota.crearMascota();
        mascota.insertarNombreMascotas('pluto');
        mascota.insertarTipoMascota();
        mascota.crearActualizarMascota();
        navBar.clickBotonAgenda();
        await expect(agenda.getTitleSubPantallaText()).toEqual('Agendas');
        await expect(agenda.mostrarNohayAgendas()).toEqual('No tiene agendas registradas!'.toUpperCase());
    });

    it('nos vamos a crear una agenda', async () => {
        agenda.crearAgenda();
        expect(browser.getCurrentUrl()).toContain('crear');
        await expect(agenda.getTitleSubPantallaText()).toEqual('Crear Agenda');
    });

    it('creamos la agenda', () => {
        agenda.insertarDireccion('Luna 2 ff');
        agenda.seleccionarMascota();
        agenda.seleccionarFechaAutomatica();
        agenda.crearActualizarAgenda();
        expect(browser.getCurrentUrl()).toContain('listar');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry));
      });

});