
import resetPassElements from "../../elements/resetpass/resetPassElements"
import toast from "../../components/toast/toast"
import loginElements from "../../elements/login/loginElements"

class ResetPassPage {

    constructor() {
        this.toast = toast
    }

    go(token) {
        cy.visit('/reset-password?token=' + token)
    }

    forms(newPass) {
        cy.get(resetPassElements.inputNewPass()).clear().type(newPass)
        cy.get(resetPassElements.confirmNewPass()).clear().type(newPass)
        cy.get(resetPassElements.submitNewPass()).click()
    }

    

}

export default new ResetPassPage()