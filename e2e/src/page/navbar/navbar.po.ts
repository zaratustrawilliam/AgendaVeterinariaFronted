import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkUsuarios = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkMascotas = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));
    linkAgenda = element(by.xpath('/html/body/app-root/app-navbar/nav/a[4]'));

    async clickBotonUsuarios() {
        await this.linkUsuarios.click();
    }

    async clickBotonMascotas() {
        await this.linkMascotas.click();
    }

    async clickBotonAgenda() {
        await this.linkAgenda.click();
    }
}
