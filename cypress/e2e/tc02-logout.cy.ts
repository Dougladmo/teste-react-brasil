
describe('TC02 - Teste de Logout (Automatizado)', () => {
  beforeEach(() => {
    // Fazer login antes de cada teste
    cy.visit('/')
    cy.get('[data-cy="login-email"]').type('standard_user@teste.com')
    cy.get('[data-cy="login-password"]').type('secret_sauce')
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
  })
  
  it('Deve realizar logout corretamente e redirecionar para tela de login', () => {
    // Verificar que está logado
    cy.get('[data-cy="user-name"]').should('be.visible')
    cy.get('[data-cy="logout-button"]').should('be.visible')
    
    // Realizar logout
    cy.get('[data-cy="logout-button"]').click()
    
    // Verificar redirecionamento para tela de login
    cy.get('[data-cy="login-form"]').should('be.visible')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    
    // Verificar que não há mais informações do usuário
    cy.get('[data-cy="user-name"]').should('not.exist')
    cy.get('[data-cy="logout-button"]').should('not.exist')
  })
})
