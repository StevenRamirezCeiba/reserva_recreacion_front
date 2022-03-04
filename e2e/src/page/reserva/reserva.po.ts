import { by, element } from 'protractor';

export class ReservaPage {
    private linkCrearReserva = element(by.id('crear-reserva'));
    private linkListarReservas = element(by.id('listar-reserva'));
    private inputNumeroDocumento = element(by.id('numeroDocumento'));
    private linkBuscarUsuario = element(by.id('buscarUsuario'));
    private inputFechaReserva = element(by.id('field_fechaReserva'));
    private inputHoraReserva = element(by.id('field_horaReserva'));
    private linkCrear = element(by.id('crearReserva'));
    private mensajeError = element(by.id('mensajeError'));
    private mensajeExito = element(by.id('mensajeExito'));
    private reservas = element.all(by.css('tbody tr'));
    private linkCancelarReserva = element(by.id('c0'));

    async clickBotonCrearReserva() {
        await this.linkCrearReserva.click();
    }

    async clickBotonListarReservas() {
        await this.linkListarReservas.click();
    }

    async ingresarNumeroDocumento(numeroDocumento) {
        await this.inputNumeroDocumento.sendKeys(numeroDocumento);
    }

    async clickBotonBuscarUsuario() {
        await this.linkBuscarUsuario.click();
    }

    async ingresarFechaReserva(fechaReserva) {
        await this.inputFechaReserva.sendKeys(fechaReserva);
    }

    async ingresarHoraReserva(horaReserva) {
        await this.inputHoraReserva.sendKeys(horaReserva);
    }

    async clickBotonCrear() {
        await this.linkCrear.click();
    }

    async obtenerMensajeError() {
        return this.mensajeError.getText() as Promise<string>;
    }

    async obtenerMensajeExito() {
        return this.mensajeExito.getText() as Promise<string>;
    }

    async contarReservas() {
        return this.reservas.count();
    }

    async clickCancelarReserva() {
        await this.linkCancelarReserva.click();
    }
}
