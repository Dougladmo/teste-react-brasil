
describe('Testes de Performance', () => {
  it('Deve carregar a página inicial em tempo aceitável', () => {
    const start = Date.now()
    
    cy.visit('/')
    cy.get('[data-cy="login-form"]').should('be.visible')
    
    const loadTime = Date.now() - start
    expect(loadTime).to.be.lessThan(3000) // Menos que 3 segundos
  })
  
  it('Deve carregar lista de produtos rapidamente após login', () => {
    cy.visit('/')
    cy.get('[data-cy="login-email"]').type('test@test.com')
    cy.get('[data-cy="login-password"]').type('password')
    
    const start = Date.now()
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
    
    const loadTime = Date.now() - start
    expect(loadTime).to.be.lessThan(2000) // Menos que 2 segundos
  })
  
  it('Deve responder rapidamente ao filtrar produtos', () => {
    cy.visit('/')
    cy.get('[data-cy="login-email"]').type('test@test.com')
    cy.get('[data-cy="login-password"]').type('password')
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
    
    const start = Date.now()
    cy.get('[data-cy="filtro-categoria"]').click()
    cy.contains('Eletrônicos').click()
    cy.get('[data-cy="produto-card"]').should('be.visible')
    
    const filterTime = Date.now() - start
    expect(filterTime).to.be.lessThan(1000) // Menos que 1 segundo
  })
})
