import forgotpasswordPage from "../support/pageObjects/forgotpassword/forgotpasswordPage"
import loginPage from '../support/pageObjects/login/login'
import resetPassPage from '../support/pageObjects/resetpass/resetPassPage'
import dashPage from '../support/pageObjects/dash/dashPage'

describe('Resgate de senha', function () {

    //lê os dados da fixture
    before(function () {
        cy.fixture("recovery").then(function (recovery) {
            this.data = recovery.user
            this.resetPass = recovery.resetPass
        })
    })

    context('Quando o usuário esquece a senha', function () {

        //Limpa o banco de dados e adiciona a massa
        before(function () {
            cy.postUser(this.data)
        })

        it('Deve poder resgatar por email', function () {
            forgotpasswordPage.go()
            forgotpasswordPage.form(this.data)
            forgotpasswordPage.submit()
            forgotpasswordPage.toast
                .shouldHaveText('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')

        })
    })

    context('Quando o usuário solicita o resgate', function () {

        //Limpa o banco de dados e adiciona a massa
        before(function () {
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        })

        it.only('Deve poder cadastrar uma nova senha', function () {

            //armazena o token obtido do banco de dados
            const token = Cypress.env('recoveryToken')
            //inicia a página da mudança de senha junto com o token gerado
            resetPassPage.go(token)
            //realiza a troca de senha
            resetPassPage.forms(this.resetPass.newPass)
            //valida o toast de mudança de senha
            resetPassPage.toast.shouldHaveText('Agora você já pode logar com a sua nova senha secreta.')
            //realiza do login com as novas credencias
            loginPage.formReset(this.resetPass)
            loginPage.submit()
            dashPage.header.userLoggedIn('Monalisa')
        })
    })
})