
import dashPage from '../support/pageObjects/dash/dashPage'
import loginPage from '../support/pageObjects/login/login'

import {customer, provider, appointment} from '../support/factories/dash/dashFactories'

describe('Dashboard', function () {

    //código comentado, pois será implementado a massa em factories
    /*before(function () {
        //instancia as massas
        cy.fixture("dash").then(function (dash) {
            this.cliente = dash.cliente
            this.provider = dash.provider
        })
    })*/

    context('Quando o cliente faz um agendamento no app mobile', function () {

        before(function () {
            //apaga e adiciona novamente ao banco de dados o cadastro do provider e do cliente
            cy.postUser(provider)
            cy.postUser(customer)

            //faz o acesso do cliente via API
            cy.apiLogin(customer)

            //armazena o token na constante 
            const token = Cypress.env('apiToken')

            //escreve o log na documentação
            cy.log('O Token é: ' + token)

            cy.setProviderId(provider.email)

            cy.createAppointment()
        })

        it('O mesmo deve ser exibido no dashboard', function () {

            loginPage.go()
            loginPage.form(provider)
            loginPage.submit()
            loginPage.header.userLoggedIn(provider.name)
            cy.wait(3000)
            dashPage.calendarShouldBeVisible()

            const day = Cypress.env('appointmentDay')
            dashPage.selectDay(day)

            dashPage.appointmentShouldBeVisible(customer)

            //const appointmentHour = '14:00'
            dashPage.hourValidate(appointment.hour)
            


        })
    })
})

