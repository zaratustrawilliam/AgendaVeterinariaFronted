import { AppPage } from './../app.po';
import { browser, logging } from 'protractor';
import { LoginPage } from './../page/login/login.po';

describe('workspace-project App', () => {
    let page: AppPage;
    let login : LoginPage;
  
    beforeEach(() => {
      page = new AppPage();
      login = new LoginPage();
      page.navigateTo();
    });

    it('validamos que podamos hacer log in',()=>{
        login.ingresarNombreUsuario('prueba2@ceiba.com.co');
        login.ingresarPassword('0123456');
        login.clickBotonLogin();
        expect(browser.getCurrentUrl()).toContain('home');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry));
      });
});