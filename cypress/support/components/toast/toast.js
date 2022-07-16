import componentsElements from "../componentsElements"

class Toast {
    //realiza a validação
    shouldHaveText(expectMessage) {
        cy.get(componentsElements.toast(), {timeout: 10000})
            .should('be.visible')
            .should('have.css', 'opacity', '1', {timeout: 1500})
            .find('p')
            .should('have.text', expectMessage)
    }
}
export default new Toast()