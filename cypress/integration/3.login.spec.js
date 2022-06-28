
import loginPage from '../support/pageObjects/login/login'
import dashPage from '../support/pageObjects/dash/dashPage'

describe('Login', function () {

    context('Com usuário válido', function () {

        const user = {
            name: "Fernando Hessel",
            email: "nandohessel@hotmail.com",
            password: "pwd123"
        }

        it('Deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('Com usuário inválido', function () {

        const user = {
            name: "Fernando Hessel",
            email: "nandohessel@hotmail.com",
            password: "123"
        }

        it('Deve aparecer mensagem de erro', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })
})