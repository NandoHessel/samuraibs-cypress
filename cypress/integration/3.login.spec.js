
import loginPage from '../support/pageObjects/login/login'
import dashPage from '../support/pageObjects/dash/dashPage'


describe('Login', function () {

    before(function() {
        cy.fixture('login').then(function(login) {
            this.success = login.success
        })
    })

    context('Com usuário válido com senha válida', function () {

        const user = {
            name: "Fernando Hessel",
            email: "nandohessel@hotmail.com",
            password: "pwd123",
            is_provider: true
        }

        before(function () {
            cy.postUser(this.success)
        })

        it('Deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(this.success)
            loginPage.submit()
            dashPage.header.userLoggedIn(this.success.name)
        })
    })

    context('Com usuário inválido com senha inválida', function () {

        let user = {
            name: "Celso Kamura",
            email: "kamura@samuraibs.com",
            password: "pwd123",
            is_provider: true
        }

        /*realiza o pré cadastro do usuário válido e após isso realiza-se a alteração da 
        senha com o auxilio da função THEN*/
        before(function () {
            cy.postUser(user).then(function () {
                user.password = "abc123"
            })
        })

        it('Deve aparecer mensagem de erro de credenciais', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })

    context('Quando o formato do email é inválido', function () {

        const emails = [
            'papito.com.br',
            'yahoo.com',
            '@gmail.com',
            '@',
            'papito@',
            '111',
            '&*&}&',
            'xpto123'
        ]

        before(function () {
            loginPage.go()
        })

        emails.forEach(function (email) {
            it('Não deve logar com o email: ' + email, function () {

                const user = {
                    email: email,
                    password: "pwd123"
                }

                loginPage.form(user)
                loginPage.submit()
                loginPage.alertError.shouldHaveAlert('Informe um email válido')
            })
        })
    })

    context('Quando não são informados os campos obrigatórios', function () {

        const alerts = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        it('deve ser informado o alerta de campos obrigatórios', function () {
            loginPage.go()
            loginPage.submit()
            alerts.forEach(function (alert) {
                loginPage.alertError.shouldHaveAlert(alert)
            })
        })

    })
})