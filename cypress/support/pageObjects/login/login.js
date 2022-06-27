
import loginElements from "../../elements/login/loginElements"
import toast from "../../components/toast/toast"

class LoginPage {

    constructor() {
        this.toast = toast
    }

    //abre a página
    go() {
        cy.visit('/')
    }

    //Preenche os dados 
    form(user) {
        cy.get(loginElements.inputEmail()).type(user.email)
        cy.get(loginElements.inputSenha()).type(user.password)
    }

    //clica em entrar
    submit() {
        cy.get(loginElements.buttonLogin()).click()
    }


}

export default new LoginPage()