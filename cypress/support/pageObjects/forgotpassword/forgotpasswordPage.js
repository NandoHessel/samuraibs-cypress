
import forgotpassElements from "../../elements/forgotpassword/forgotpassElements";
import loginPage from "../login/login"
import toast from "../../components/toast/toast";

class ForgotPasswordPage {

    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit('/')
        loginPage.recovery()
    }

    form(user) {
        cy.get(forgotpassElements.inputEmail())
            .clear()
            .type(user.email)
    }

    submit() {
        cy.get(forgotpassElements.buttonRecovery()).click()
    }
}

export default new ForgotPasswordPage()