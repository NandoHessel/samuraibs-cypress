
import signupPage from '../support/pageObjects/signup/signupPage'


describe('Cadastro', function () {

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

    context('Quando o email é incorreto', function () {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'
        }

        it('Deve exibir mensagem de alerta', function () {
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

    context('Quando a senha tem menos de 6 caractéres', function () {
        //uma lista com 5 senhas abaixo de 6 caracteres
        const passwords = ['1', '2a', '3ab', '4abc', '5abcd']
        //abre a tela antes de cada execução
        beforeEach(function () {
            //abre a página
            signupPage.go()
        })
        //executa o it por 5 vezes testando cada umas das senhas informadas
        passwords.forEach(function (p) {
            it('Não deve cadastrar para uma senha menor do que 6 caracteres. Senhas testadas: ' + p, function () {
                const user = {
                    name: 'Gessica de Macedo',
                    email: 'gessica_macedo@hotmail.com',
                    password: p
                }
                //Preenche os dados 
                signupPage.form(user)
                //clica em cadastrar
                signupPage.submit()
            })
        })
        //após cada execução, valida a mensagem de alerta
        afterEach(function () {
            //valida msg de erro de senha inválida
            signupPage.alertError.shouldHaveAlert('Pelo menos 6 caracteres')
        })
    })

    context('Quando os campos obrigatórios não são preenchidos', function () {
        it('Não cadastrar se todos os campos estiverem vazios:', function () {
            //lista com as mensagens
            const alertMessages = [
                'Nome é obrigatório',
                'E-mail é obrigatório',
                'Senha é obrigatória'
            ]
            //abre a página
            signupPage.go()
            //clica em cadastrar
            signupPage.submit()
            //verifica as msgs de alerta
            alertMessages.forEach(function (alert) {
                signupPage.alertError.shouldHaveAlert(alert)
            })
        })

    })
})