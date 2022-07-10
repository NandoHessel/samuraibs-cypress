// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('postUser', function (user) {
    //limpa a massa do banco antes do teste
    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result)
        })

    //pré cadastro por chamada de API antes da validação
    cy.request(
        'POST',
        'http://localhost:3333/users',
        user
    ).then(function (response) {
        expect(response.status).to.eq(200)
    })
})

//Comando para realizar a requisição da troca de senha e armazenar o token da requisição
Cypress.Commands.add('recoveryPass', function (email) {
    cy.request(
        'POST',
        'http://localhost:3333/password/forgot',
        { email: email }
    ).then(function (response) {
        expect(response.status).to.eq(204)

        cy.task('findToken', email)
            .then(function (result) {
                Cypress.env('recoveryToken', result.token)
            })
    })
})

//Comando para realizar o acesso do usuário via API e armazenamento do token
Cypress.Commands.add('apiLogin', function(user){
    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then(function(response) {
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)
    })
})

//Comando para buscar o samurai disponível utilizando o token de validação do usuário
Cypress.Commands.add('setProviderId', function(providerEmail) {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3333/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function(response) {
        expect(response.status).to.eq(200)
        console.log(response.body)

        const providerList = response.body
        //verifica se o email do response é igual ao email da massa de dados informada e armazena o id na variável
        providerList.forEach(function(provider) {
            if (provider.email == providerEmail) {
                Cypress.env('providerId', provider.id)
            }
        })
    })
})

//cria o agendamento via API
import moment from 'moment'
Cypress.Commands.add('createAppointment', function() {
    let now = new Date()

    now.setDate(now.getDate() + 1)

    const date = moment(now).format('YYYY-MM-DD 14:00:00')

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/appointments',
        body: payload,
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function(response) {
        expect(response.status).to.eq(200)
    })

})
