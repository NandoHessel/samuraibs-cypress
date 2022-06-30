
import loginPage from '../support/pageObjects/login/login'
import dashPage from '../support/pageObjects/dash/dashPage'


describe('Login', function () {

    context('Com usuário válido com senha válida', function () {

        const user = {
            name: "Fernando Hessel",
            email: "nandohessel@hotmail.com",
            password: "pwd123",
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('Deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
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
            cy.postUser(user).then(function() {
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
})