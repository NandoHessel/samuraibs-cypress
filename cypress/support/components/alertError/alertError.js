import componentsElements from "../componentsElements"

class AlertError {
    //localiza o elemento que terá a mensagem de alerta indicada
    shouldHaveAlert(alertError) {
        cy.contains(componentsElements.alertError(), alertError)
            .should('be.visible')
    }
}
export default new AlertError()