
describe('TC05 - Teste de Remoção de Produto do Carrinho (Manual)', () => {
  beforeEach(() => {
    // Login
    cy.visit('/')
    cy.get('[data-cy="login-email"]').type('standard_user@teste.com')
    cy.get('[data-cy="login-password"]').type('secret_sauce')
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
  })
  
  it('Deve remover produto do carrinho corretamente', () => {
    // Adicionar produto ao carrinho
    cy.get('[data-cy="adicionar-carrinho"]').first().click()
    
    // Verificar que foi adicionado
    cy.get('[data-cy="carrinho-contador"]').should('contain', '1')
    
    // Abrir carrinho
    cy.get('[data-cy="abrir-carrinho"]').click()
    cy.get('[data-cy="carrinho-sidebar"]').should('be.visible')
    
    // Verificar que há item no carrinho
    cy.get('[data-cy="item-carrinho"]').should('have.length', 1)
    
    // Armazenar o total antes da remoção
    cy.get('[data-cy="total-carrinho"]').invoke('text').as('totalAntes')
    
    // Remover item
    cy.get('[data-cy="remover-item"]').click()
    
    // Verificar que o item foi removido
    cy.get('[data-cy="item-carrinho"]').should('not.exist')
    
    // Verificar que o contador foi atualizado
    cy.get('[data-cy="carrinho-contador"]').should('not.exist')
    
    // Verificar mensagem de carrinho vazio
    cy.contains('Seu carrinho está vazio').should('be.visible')
  })
  
  it('Deve atualizar quantidade corretamente', () => {
    // Adicionar produto ao carrinho
    cy.get('[data-cy="adicionar-carrinho"]').first().click()
    
    // Abrir carrinho
    cy.get('[data-cy="abrir-carrinho"]').click()
    
    // Verificar quantidade inicial
    cy.get('[data-cy="item-quantidade"]').should('contain', '1')
    
    // Aumentar quantidade
    cy.get('[data-cy="aumentar-quantidade"]').click()
    cy.get('[data-cy="item-quantidade"]').should('contain', '2')
    cy.get('[data-cy="carrinho-contador"]').should('contain', '2')
    
    // Diminuir quantidade
    cy.get('[data-cy="diminuir-quantidade"]').click()
    cy.get('[data-cy="item-quantidade"]').should('contain', '1')
    cy.get('[data-cy="carrinho-contador"]').should('contain', '1')
  })
  
  it('Deve remover múltiplos produtos independentemente', () => {
    // Adicionar dois produtos diferentes
    cy.get('[data-cy="adicionar-carrinho"]').eq(0).click()
    cy.get('[data-cy="adicionar-carrinho"]').eq(1).click()
    
    // Verificar que há 2 itens
    cy.get('[data-cy="carrinho-contador"]').should('contain', '2')
    
    // Abrir carrinho
    cy.get('[data-cy="abrir-carrinho"]').click()
    
    // Verificar que há 2 itens no carrinho
    cy.get('[data-cy="item-carrinho"]').should('have.length', 2)
    
    // Remover primeiro item
    cy.get('[data-cy="remover-item"]').first().click()
    
    // Verificar que ainda há 1 item
    cy.get('[data-cy="item-carrinho"]').should('have.length', 1)
    cy.get('[data-cy="carrinho-contador"]').should('contain', '1')
    
    // Remover segundo item
    cy.get('[data-cy="remover-item"]').click()
    
    // Verificar que o carrinho está vazio
    cy.get('[data-cy="item-carrinho"]').should('not.exist')
    cy.get('[data-cy="carrinho-contador"]').should('not.exist')
  })
})
