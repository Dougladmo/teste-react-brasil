
// Import commands
import './commands'

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing tests on uncaught exceptions
  return false
})

// Custom assertions
Cypress.Commands.add('shouldBeVisible', (selector: string) => {
  cy.get(selector).should('be.visible')
})

Cypress.Commands.add('shouldContain', (selector: string, text: string) => {
  cy.get(selector).should('contain', text)
})

declare global {
  namespace Cypress {
    interface Chainable {
      shouldBeVisible(selector: string): Chainable<void>
      shouldContain(selector: string, text: string): Chainable<void>
    }
  }
}
