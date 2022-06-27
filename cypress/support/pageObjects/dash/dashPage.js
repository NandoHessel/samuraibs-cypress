
import dashElements from '../../elements/dash/dashElements'

class DashPage {

    validate(name) {
        cy.contains(dashElements.usuario(), name)
            .should('be.visible')
    }

}

export default new DashPage()
