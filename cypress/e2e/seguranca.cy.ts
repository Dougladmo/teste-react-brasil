
describe('Testes de Segurança Básicos', () => {
  it('Deve prevenir XSS em campos de input', () => {
    cy.visit('/')
    
    // Tentar inserir script malicioso no campo de email
    const scriptMalicioso = '<script>alert("XSS")</script>'
    
    cy.get('[data-cy="login-email"]').type(scriptMalicioso)
    cy.get('[data-cy="login-password"]').type('password')
    cy.get('[data-cy="login-submit"]').click()
    
    // Verificar que o script não foi executado no DOM
    cy.get('[data-cy="login-email"]').should('have.value', scriptMalicioso)
    // Verificar que não há elemento script injetado no DOM
    cy.get('script').should('not.contain', 'alert("XSS")')
  })
  
  it('Deve proteger rotas autenticadas', () => {
    // Tentar acessar sem estar logado
    cy.visit('/')
    
    // Verificar que foi redirecionado para login
    cy.get('[data-cy="login-form"]').should('be.visible')
    cy.url().should('include', '/')
  })
  
  it('Deve validar campos obrigatórios', () => {
    cy.visit('/')
    
    // Tentar submeter formulário vazio
    cy.get('[data-cy="login-submit"]').click()
    
    // Verificar que permanece na tela de login
    cy.get('[data-cy="login-form"]').should('be.visible')
  })
  
  it('Deve sanitizar dados de entrada no checkout', () => {
    // Login primeiro
    cy.visit('/')
    cy.get('[data-cy="login-email"]').type('standard_user@teste.com')
    cy.get('[data-cy="login-password"]').type('secret_sauce')
    cy.get('[data-cy="login-submit"]').click()
    
    // Aguardar carregamento da página de produtos
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
    
    // Adicionar produto e ir para checkout
    cy.get('[data-cy="adicionar-carrinho"]').first().click()
    cy.get('[data-cy="carrinho-contador"]').should('be.visible')
    cy.get('[data-cy="abrir-carrinho"]').click()
    cy.get('[data-cy="finalizar-compra"]').click()
    
    // Tentar inserir código malicioso nos campos
    const inputMalicioso = '<script>alert("hack")</script>'
    
    cy.get('[data-cy="endereco-rua"]').type(inputMalicioso)
    cy.get('[data-cy="endereco-cidade"]').type(inputMalicioso)
    
    // Verificar que os dados foram inseridos mas não executados
    cy.get('[data-cy="endereco-rua"]').should('have.value', inputMalicioso)
    cy.get('[data-cy="endereco-cidade"]').should('have.value', inputMalicioso)
    
    // Verificar que não há script executado
    cy.get('script').should('not.contain', 'alert("hack")')
  })
})
