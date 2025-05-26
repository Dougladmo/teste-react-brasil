
describe('TC03 - Teste de Checkout Completo (Automatizado)', () => {
  beforeEach(() => {
    // Login
    cy.visit('/')
    cy.get('[data-cy="login-email"]').type('teste@teste.com')
    cy.get('[data-cy="login-password"]').type('123456')
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
  })
  
  it('Deve completar o fluxo de compra com sucesso', () => {
    // Adicionar produto ao carrinho
    cy.get('[data-cy="adicionar-carrinho"]').first().click()
    
    // Verificar que o carrinho foi atualizado
    cy.get('[data-cy="carrinho-contador"]').should('contain', '1')
    
    // Abrir carrinho
    cy.get('[data-cy="abrir-carrinho"]').click()
    cy.get('[data-cy="carrinho-sidebar"]').should('be.visible')
    
    // Verificar item no carrinho
    cy.get('[data-cy="itens-carrinho"]').should('be.visible')
    cy.get('[data-cy="item-carrinho"]').should('have.length.at.least', 1)
    
    // Prosseguir para checkout
    cy.get('[data-cy="finalizar-compra"]').click()
    cy.get('[data-cy="checkout-modal"]').should('be.visible')
    
    // Preencher dados de endereço
    cy.get('[data-cy="endereco-rua"]').type('Rua das Flores, 123')
    cy.get('[data-cy="endereco-numero"]').type('123')
    cy.get('[data-cy="endereco-bairro"]').type('Centro')
    cy.get('[data-cy="endereco-cidade"]').type('João Silva')
    cy.get('[data-cy="endereco-cep"]').type('12345-678')
    
    // Selecionar forma de pagamento
    cy.get('input[value="dinheiro"]').click()
    
    // Confirmar pedido
    cy.get('[data-cy="confirmar-pedido"]').click()
    
    // Verificar mensagem de sucesso
    cy.contains('Pedido realizado com sucesso!').should('be.visible')
    
    // Verificar que o carrinho foi limpo
    cy.get('[data-cy="carrinho-contador"]').should('not.exist')
  })
  
  it('Deve validar preenchimento obrigatório dos campos', () => {
    // Adicionar produto e ir para checkout
    cy.get('[data-cy="adicionar-carrinho"]').first().click()
    cy.get('[data-cy="abrir-carrinho"]').click()
    cy.get('[data-cy="finalizar-compra"]').click()
    
    // Tentar confirmar sem preencher
    cy.get('[data-cy="confirmar-pedido"]').should('be.disabled')
    
    // Preencher apenas endereço
    cy.get('[data-cy="endereco-rua"]').type('Rua Teste')
    cy.get('[data-cy="endereco-numero"]').type('123')
    cy.get('[data-cy="endereco-bairro"]').type('Bairro Teste')
    cy.get('[data-cy="endereco-cidade"]').type('Cidade Teste')
    cy.get('[data-cy="endereco-cep"]').type('12345-678')
    
    // Botão ainda deve estar desabilitado (sem forma de pagamento)
    cy.get('[data-cy="confirmar-pedido"]').should('be.disabled')
    
    // Selecionar forma de pagamento
    cy.get('input[value="dinheiro"]').click()
    
    // Agora o botão deve estar habilitado
    cy.get('[data-cy="confirmar-pedido"]').should('not.be.disabled')
  })
})
