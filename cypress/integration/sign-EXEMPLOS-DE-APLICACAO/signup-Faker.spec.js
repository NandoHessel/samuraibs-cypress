

import faker from '@faker-js/faker'

it.skip('Deve cadastrar um novo usuário', function () {

    const nome = faker.name.findName()
    const email = faker.internet.email()
    const senha = faker.internet.password(8)

    //abre a página
    cy.visit('/')
    cy.get('a[href="/signup"]').click()

    //Preenche os dados 
    cy.get('input[placeholder="Nome"]').type(nome)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(senha)


    //clica em cadastrar
    cy.get('.sc-AxgMl').click()

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')



})