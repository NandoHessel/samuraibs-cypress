import componentsElements from "../componentsElements"

class Toast {
    //realiza a validação
    shouldHaveText(expectMessage) {
        cy.get(componentsElements.toast())
            .should('be.visible')
            .find('p')
            .should('have.text', expectMessage)
    }
}
export default new Toast()