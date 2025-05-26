
describe('TC03 - Teste de Checkout Completo (Automatizado)', () => {
  beforeEach(() => {
    // Login
    cy.visit('/')
    cy.get('[data-cy="login-email"]').type('teste@teste.com')
    cy.get('[data-cy="login-password"]').type('123456')
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
  })
    it('Deve completar o fluxo de compra com cartão de crédito', () => {
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
    cy.get('[data-cy="endereco-cidade"]').type('São Paulo')
    cy.get('[data-cy="endereco-cep"]').type('12345-678')
    
    // Selecionar forma de pagamento - cartão
    cy.get('label[for="cartao"]').click()
    
    // Preencher dados do cartão
    cy.get('[data-cy="numero-cartao"]').type('4111111111111111')
    cy.get('[data-cy="nome-cartao"]').type('João Silva')
    cy.get('[data-cy="validade"]').type('12/25')
    cy.get('[data-cy="cvv"]').type('123')
    
    // Confirmar pedido
    cy.get('[data-cy="confirmar-pedido"]').click()
    
    // Verificar mensagem de sucesso
    cy.contains('Pedido realizado com sucesso!').should('be.visible')
    
    // Verificar que o carrinho foi limpo
    cy.get('[data-cy="carrinho-contador"]').should('not.exist')
  })

  it('Deve completar o fluxo de compra com PIX', () => {
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
    cy.get('[data-cy="endereco-rua"]').type('Av. Paulista, 456')
    cy.get('[data-cy="endereco-numero"]').type('789')
    cy.get('[data-cy="endereco-bairro"]').type('Bela Vista')
    cy.get('[data-cy="endereco-cidade"]').type('São Paulo')
    cy.get('[data-cy="endereco-cep"]').type('04567-890')
    
    // Selecionar forma de pagamento - PIX
    cy.get('label[for="pix"]').click()
    
    // Confirmar que já pagou via PIX
    cy.get('[data-cy="pix-ja-paguei"]').click()
    
    // Confirmar pedido
    cy.get('[data-cy="confirmar-pedido"]').click()
    
    // Verificar mensagem de sucesso
    cy.contains('Pedido realizado com sucesso!').should('be.visible')
    
    // Verificar que o carrinho foi limpo
    cy.get('[data-cy="carrinho-contador"]').should('not.exist')
  })
    it('Deve validar preenchimento obrigatório dos campos para cartão', () => {
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
    
    // Selecionar cartão sem preencher dados
    cy.get('label[for="cartao"]').click()
    cy.get('[data-cy="confirmar-pedido"]').should('be.disabled')
    
    // Preencher dados do cartão
    cy.get('[data-cy="numero-cartao"]').type('4111111111111111')
    cy.get('[data-cy="nome-cartao"]').type('João Silva')
    cy.get('[data-cy="validade"]').type('12/25')
    cy.get('[data-cy="cvv"]').type('123')
    
    // Agora o botão deve estar habilitado
    cy.get('[data-cy="confirmar-pedido"]').should('not.be.disabled')
  })

  it('Deve validar preenchimento obrigatório dos campos para PIX', () => {
    // Adicionar produto e ir para checkout
    cy.get('[data-cy="adicionar-carrinho"]').first().click()
    cy.get('[data-cy="abrir-carrinho"]').click()
    cy.get('[data-cy="finalizar-compra"]').click()
    
    // Preencher endereço
    cy.get('[data-cy="endereco-rua"]').type('Rua Teste')
    cy.get('[data-cy="endereco-numero"]').type('123')
    cy.get('[data-cy="endereco-bairro"]').type('Bairro Teste')
    cy.get('[data-cy="endereco-cidade"]').type('Cidade Teste')
    cy.get('[data-cy="endereco-cep"]').type('12345-678')
    
    // Selecionar PIX sem confirmar pagamento
    cy.get('label[for="pix"]').click()
    cy.get('[data-cy="confirmar-pedido"]').should('be.disabled')
    
    // Confirmar pagamento PIX
    cy.get('[data-cy="pix-ja-paguei"]').click()
    
    // Agora o botão deve estar habilitado
    cy.get('[data-cy="confirmar-pedido"]').should('not.be.disabled')
  })
})
