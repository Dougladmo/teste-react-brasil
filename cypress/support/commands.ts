
// Comando para login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/')
  cy.get('[data-cy="login-email"]').type(email)
  cy.get('[data-cy="login-password"]').type(password)
  cy.get('[data-cy="login-submit"]').click()
})

// Comando para logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="logout-button"]').click()
})

// Comando para adicionar produto ao carrinho
Cypress.Commands.add('adicionarProdutoAoCarrinho', () => {
  cy.get('[data-cy="adicionar-carrinho"]').first().click()
})

// Comando para abrir carrinho
Cypress.Commands.add('abrirCarrinho', () => {
  cy.get('[data-cy="abrir-carrinho"]').click()
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      logout(): Chainable<void>
      adicionarProdutoAoCarrinho(): Chainable<void>
      abrirCarrinho(): Chainable<void>
    }
  }
}
