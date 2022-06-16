
import signupPage from '../../support/pageObjects/signup/signupPage'


describe.skip('Cadastro', function () {

    context('Quando o usuário é novo', function () {

        const user = {
            name: 'Fernando Hessel',
            email: 'nandohessel@hotmail.com',
            password: 'pwd123'
        }

        before(function () {

            //instancia a função criada para interagir no BD
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar com sucesso', function () {
            //abre a página
            signupPage.go()
            //Preenche os dados 
            signupPage.form(user)
            //clica em cadastrar
            signupPage.submit()
            //valida o texto
            signupPage.toast
                .shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando o email já existe', function () {

        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            //instancia a função criada para interagir no BD
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

        it('Deve exibir que email já está cadastrado', function () {
            //abre a página
            signupPage.go()
            //Preenche os dados 
            signupPage.form(user)
            //clica em cadastrar
            signupPage.submit()
            //valida o texto
            signupPage.toast
                .shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o email é incorreto', function() {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'
        }

        it.skip('Deve exibir mensagem de alerta', function() {
            //abre a página
            signupPage.go()
            //Preenche os dados 
            signupPage.form(user)
            //clica em cadastrar
            signupPage.submit()
            //valida msg de erro do email inválido
            signupPage.alertError.shouldHaveAlert('Informe um email válido')
        })
    })

})