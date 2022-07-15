
import header from '../../components/header/header'
import dashElements from '../../elements/dash/dashElements'

class DashPage {

   constructor() {
      this.header = header
   }

   calendarShouldBeVisible() {
      cy.get(dashElements.calendar(), { timeout: 7000 })
         .should('be.visible')
   }

   selectDay(day) {

      let today = new Date()
      //código para pegar o último dia do mês
      let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

     
      if (today.getDate() === lastDayOfMonth.getDate()) {
         cy.get(dashElements.buttonNextMonth()).click()
      }
      
      const target = new RegExp('^' + day + '$', 'g')
      cy.contains(dashElements.day(), target)
         .click({ force: true })
   }

   appointmentShouldBeVisible(customer) {
      cy.contains(dashElements.customerValidate(), customer.name)
         .should('be.visible')
   }

   hourValidate(hour) {
      cy.contains(dashElements.hourValidate(), hour)
         .should('be.visible')
   }

}

export default new DashPage()
