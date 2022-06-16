

import signupElements from '../../elements/signup/signupElements'
import toast from '../../components/toast/toast'
import alertError from '../../components/alertError/alertError'
//import {el} from '../../elements'

class SignupPage {

    constructor() {
        this.toast = toast
        this.alertError = alertError
    }

    //abre a página
    go() {
        cy.visit('/')
        cy.get(signupElements.botaoCriarConta()).click()
    }

    //Preenche os dados 
    form(user) {
        cy.get(signupElements.inputNome()).type(user.name)
        cy.get(signupElements.inputEmail()).type(user.email)
        cy.get(signupElements.inputSenha()).type(user.password)
    }

    //clica em cadastrar
    submit() {
        cy.get(signupElements.botaoSubmeter()).click()
    }

}
//exportar a classe já instanciada
export default new SignupPage()