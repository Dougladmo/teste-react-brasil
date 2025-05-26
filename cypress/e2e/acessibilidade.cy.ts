
describe('Testes de Acessibilidade', () => {
  it('Deve ter estrutura semântica adequada', () => {
    cy.visit('/')
    
    // Fazer login primeiro para acessar a página principal
    cy.get('[data-cy="login-email"]').type('standard_user@teste.com')
    cy.get('[data-cy="login-password"]').type('secret_sauce')
    cy.get('[data-cy="login-submit"]').click()
    
    // Verificar que há elementos semânticos
    cy.get('main').should('exist')
    cy.get('header').should('exist')
    
    // Verificar que botões têm textos descritivos
    cy.get('[data-cy="adicionar-carrinho"]').should('contain.text', 'Adicionar')
    
    // Verificar que inputs têm labels (na tela de login)
    cy.visit('/')
    cy.get('label[for="email"]').should('exist')
    cy.get('label[for="password"]').should('exist')
  })
  
  it('Deve ser navegável por teclado', () => {
    cy.visit('/')
    
    // Testar navegação por Tab na tela de login
    cy.get('[data-cy="login-email"]').focus()
    cy.focused().should('have.attr', 'data-cy', 'login-email')
    
    cy.focused().tab()
    cy.focused().should('have.attr', 'data-cy', 'login-password')
    
    cy.focused().tab()
    cy.focused().should('have.attr', 'data-cy', 'login-submit')
  })
  
  it('Deve ter contraste adequado', () => {
    cy.visit('/')
    
    // Verificar cores de texto e fundo (teste visual básico)
    cy.get('[data-cy="login-form"]').should('be.visible')
    cy.get('h1').should('have.css', 'color').and('not.equal', 'rgba(0, 0, 0, 0)')
  })
  
  it('Deve funcionar em diferentes tamanhos de tela', () => {
    // Teste mobile
    cy.viewport(375, 667)
    cy.visit('/')
    cy.get('[data-cy="login-form"]').should('be.visible')
    
    // Teste tablet
    cy.viewport(768, 1024)
    cy.visit('/')
    cy.get('[data-cy="login-form"]').should('be.visible')
    
    // Teste desktop
    cy.viewport(1920, 1080)
    cy.visit('/')
    cy.get('[data-cy="login-form"]').should('be.visible')
  })
})
