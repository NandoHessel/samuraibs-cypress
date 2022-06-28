
import componentsElements from "../componentsElements"

class Header {

    userLoggedIn(name) {
        cy.contains(componentsElements.userLogged(), name)
            .should('be.visible')
    }
}

export default new Header()
