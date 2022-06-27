

describe('Cadastro', function () {

    it.skip('Deve cadastrar um novo usuário', function () {

        const nome = 'Fernando Hessel'
        const email = 'nandohessel@hotmail.com'
        const senha = 'pwd123'

        //instancia a função criada para interagir no BD
        cy.task('removeUser', email).then(function (result) {
            console.log(result)
        })

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

    it.skip('Deve exibir que email já está cadastrado', function () {

        const nome = 'Fernando Hessel'
        const email = 'nandohessel@hotmail.com'
        const senha = 'pwd123'

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
            .should('have.text', 'Email já cadastrado para outro usuário.')
    })
    
})