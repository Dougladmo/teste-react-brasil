
describe('TC01 - Login Válido (Automatizado)', () => {
  it('Deve realizar login com credenciais válidas e redirecionar para página de produtos', () => {
    // Visitar a página inicial
    cy.visit('/')
    
    // Verificar se está na tela de login
    cy.get('[data-cy="login-form"]').should('be.visible')
    
    // Preencher credenciais válidas
    cy.get('[data-cy="login-email"]').type('standard_user@teste.com')
    cy.get('[data-cy="login-password"]').type('secret_sauce')
    
    // Clicar no botão de login
    cy.get('[data-cy="login-submit"]').click()
    
    // Verificar redirecionamento para página de produtos
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
    cy.get('[data-cy="user-name"]').should('contain', 'standard_user@teste.com')
    
    // Verificar se o header está visível
    cy.contains('Garimpo').should('be.visible')
    cy.contains('Tesouros Únicos').should('be.visible')
  })
  
  it('Deve mostrar erro com credenciais inválidas', () => {
    cy.visit('/')
    
    cy.get('[data-cy="login-email"]').type('usuario_invalido@teste.com')
    cy.get('[data-cy="login-password"]').type('senha_errada')
    cy.get('[data-cy="login-submit"]').click()
    
    // Verificar que permanece na tela de login
    cy.get('[data-cy="login-form"]').should('be.visible')
  })
})
