// import { browser, logging } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ReservaPage } from '../page/reserva/reserva.po';
import * as moment from 'moment';

const RESERVA_CREADA_CON_EXITO = 'Reserva creada con éxito!';
const RESERVA_CANCELADA_CON_EXITO = 'Reserva cancelada con éxito!';

describe('workspace-project Reserva', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let reserva: ReservaPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        reserva = new ReservaPage();
    });

    it('Deberia crear reserva', () => {
        const NUMERO_DOCUMENTO = 1075318997;
        const FECHA_RESERVA = moment().add(10, 'days').format('MM-DD-YYYY');
        const date = new Date();
        const HORA_RESERVA = date.toISOString().substring(11, 16);

        page.navigateTo();
        navBar.clickBotonReservas();
        reserva.clickBotonCrearReserva();
        reserva.ingresarNumeroDocumento(NUMERO_DOCUMENTO);
        reserva.clickBotonBuscarUsuario();
        reserva.ingresarFechaReserva(FECHA_RESERVA);
        reserva.ingresarHoraReserva(HORA_RESERVA);
        reserva.clickBotonCrear();
        expect(reserva.obtenerMensajeExito()).toContain(RESERVA_CREADA_CON_EXITO);
    });

    it('Deberia cancelar una reserva', () => {
        const NUMERO_DOCUMENTO = 1075318997;

        page.navigateTo();
        navBar.clickBotonReservas();
        reserva.clickBotonListarReservas();
        reserva.ingresarNumeroDocumento(NUMERO_DOCUMENTO);
        reserva.clickBotonBuscarUsuario();
        reserva.clickCancelarReserva();
        expect(reserva.obtenerMensajeExito()).toContain(RESERVA_CANCELADA_CON_EXITO);
    });
});
