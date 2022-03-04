import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.id('a0'));
    linkReserva = element(by.id('a1'));

    async clickBotonReservas() {
        await this.linkReserva.click();
    }
}
