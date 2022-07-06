
import loginElements from "../../elements/login/loginElements"
import toast from "../../components/toast/toast"
import alertError from "../../components/alertError/alertError"

class LoginPage {

    constructor() {
        this.toast = toast
        this.alertError = alertError

    }

    //abre a página
    go() {
        cy.visit('/')
    }

    //Preenche os dados após limpar os campos 
    form(user) {
        cy.get(loginElements.inputEmail()).clear().type(user.email)
        cy.get(loginElements.inputSenha()).clear().type(user.password)
    }

    //clica em entrar
    submit() {
        cy.get(loginElements.buttonLogin()).click()
    }

    //clica em recuperar a senha
    recovery() {
        cy.get(loginElements.buttonForgot()).click()
    }

    formReset(resetPass) {
        cy.get(loginElements.inputEmail()).clear().type(resetPass.email)
        cy.get(loginElements.inputSenha()).clear().type(resetPass.newPass)
    }

}

export default new LoginPage()