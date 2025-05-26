describe('TC07 - Processo de Checkout Completo', () => {
  beforeEach(() => {
    cy.login();
    
    // Adicionar produtos ao carrinho antes de cada teste
    cy.addToCart();
    cy.get('[data-cy^="add-to-cart-"]').eq(1).click();
    cy.waitForToast('Produto adicionado ao carrinho');
  });

  it('Deve realizar checkout completo com cartão de crédito', () => {
    // Ir para checkout
    cy.proceedToCheckout();
    
    // Preencher dados de entrega e pagamento
    cy.completeCheckout(
      'João Silva',
      '01310-100',
      'Rua Augusta, 123 - Consolação',
      'cartao'
    );
    
    // Verificar confirmação do pedido
    cy.get('[data-cy="order-confirmation"]').should('be.visible');
    cy.contains('Pedido realizado com sucesso').should('be.visible');
    cy.get('[data-cy="order-number"]').should('be.visible');
    
    // Verificar que carrinho foi limpo
    cy.get('[data-cy="cart-count"]').should('contain', '0');
  });

  it('Deve realizar checkout completo com PIX', () => {
    cy.proceedToCheckout();
    
    cy.completeCheckout(
      'Maria Santos',
      '04567-890',
      'Av. Paulista, 456 - Bela Vista',
      'pix'
    );
    
    // Verificar que método PIX foi selecionado e QR Code é exibido
    cy.get('[data-cy="pix-qrcode"]').should('be.visible');
    cy.contains('PIX').should('be.visible');
    
    // Confirmar pedido
    cy.get('[data-cy="confirm-pix-payment"]').click();
    cy.get('[data-cy="order-confirmation"]').should('be.visible');
  });

  it('Deve realizar checkout completo com boleto', () => {
    cy.proceedToCheckout();
    
    cy.completeCheckout(
      'Carlos Oliveira',
      '20040-020',
      'Rua do Flamengo, 789 - Flamengo',
      'boleto'
    );
    
    // Verificar que boleto foi gerado
    cy.get('[data-cy="boleto-info"]').should('be.visible');
    cy.contains('Boleto').should('be.visible');
    cy.get('[data-cy="boleto-barcode"]').should('be.visible');
    
    // Confirmar pedido
    cy.get('[data-cy="confirm-boleto-payment"]').click();
    cy.get('[data-cy="order-confirmation"]').should('be.visible');
  });

  it('Deve validar campos obrigatórios no checkout', () => {
    cy.proceedToCheckout();
    
    // Tentar finalizar sem preencher dados
    cy.get('[data-cy="finalize-order"]').click();
    
    // Verificar mensagens de erro
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('CEP é obrigatório').should('be.visible');
    cy.contains('Endereço é obrigatório').should('be.visible');
    cy.contains('Selecione um método de pagamento').should('be.visible');
    
    // Verificar que não foi para página de confirmação
    cy.get('[data-cy="checkout-form"]').should('be.visible');
  });

  it('Deve calcular frete baseado no CEP', () => {
    cy.proceedToCheckout();
    
    // Preencher CEP e verificar cálculo do frete
    cy.get('[data-cy="checkout-cep"]').type('01310-100');
    cy.get('[data-cy="calculate-shipping"]').click();
    
    // Verificar que frete foi calculado
    cy.get('[data-cy="shipping-cost"]').should('be.visible');
    cy.get('[data-cy="shipping-cost"]').should('not.contain', 'R$ 0,00');
    
    // Verificar que total foi atualizado com frete
    cy.get('[data-cy="total-with-shipping"]').should('be.visible');
  });

  it('Deve mostrar resumo do pedido no checkout', () => {
    cy.proceedToCheckout();
    
    // Verificar que resumo do pedido está visível
    cy.get('[data-cy="order-summary"]').should('be.visible');
    
    // Verificar itens no resumo
    cy.get('[data-cy="summary-item"]').should('have.length', 2);
    
    // Verificar que subtotal está correto
    cy.get('[data-cy="subtotal"]').should('be.visible');
    cy.get('[data-cy="subtotal"]').should('not.contain', 'R$ 0,00');
    
    // Verificar que total está visível
    cy.get('[data-cy="order-total"]').should('be.visible');
  });

  it('Deve permitir editar carrinho durante checkout', () => {
    cy.proceedToCheckout();
    
    // Clicar para editar carrinho
    cy.get('[data-cy="edit-cart"]').click();
    
    // Verificar que voltou para página de produtos
    cy.get('[data-cy="lista-produtos"]').should('be.visible');
    
    // Remover um item do carrinho
    cy.openCart();
    cy.get('[data-cy^="remove-from-cart-"]').first().click();
    cy.waitForToast('Produto removido do carrinho');
    
    // Voltar para checkout
    cy.proceedToCheckout();
    
    // Verificar que resumo foi atualizado
    cy.get('[data-cy="summary-item"]').should('have.length', 1);
  });

  it('Deve validar formato do CEP', () => {
    cy.proceedToCheckout();
    
    // Tentar CEP com formato inválido
    cy.get('[data-cy="checkout-cep"]').type('123');
    cy.get('[data-cy="checkout-name"]').click(); // Trigger validation
    
    cy.contains('CEP deve ter 8 dígitos').should('be.visible');
    
    // Corrigir CEP
    cy.get('[data-cy="checkout-cep"]').clear().type('01310-100');
    cy.get('[data-cy="checkout-name"]').click();
    
    // Verificar que erro sumiu
    cy.contains('CEP deve ter 8 dígitos').should('not.exist');
  });

  it('Deve aplicar desconto quando aplicável', () => {
    cy.proceedToCheckout();
    
    // Aplicar cupom de desconto
    cy.get('[data-cy="discount-code"]').type('DESCONTO10');
    cy.get('[data-cy="apply-discount"]').click();
    
    // Verificar que desconto foi aplicado
    cy.waitForToast('Desconto aplicado com sucesso');
    cy.get('[data-cy="discount-amount"]').should('be.visible');
    cy.get('[data-cy="discount-amount"]').should('contain', '10%');
    
    // Verificar que total foi atualizado
    cy.get('[data-cy="order-total"]').invoke('text').as('totalComDesconto');
  });

  it('Deve mostrar opções de parcelamento para cartão', () => {
    cy.proceedToCheckout();
    
    // Preencher dados básicos
    cy.get('[data-cy="checkout-name"]').type('João Silva');
    cy.get('[data-cy="checkout-cep"]').type('01310-100');
    cy.get('[data-cy="checkout-address"]').type('Rua Augusta, 123');
    
    // Selecionar cartão de crédito
    cy.get('[data-cy="payment-cartao"]').click();
    
    // Verificar que opções de parcelamento aparecem
    cy.get('[data-cy="installments"]').should('be.visible');
    cy.get('[data-cy="installments"]').select('3x');
    
    // Verificar que valor das parcelas é mostrado
    cy.get('[data-cy="installment-value"]').should('be.visible');
    cy.get('[data-cy="installment-value"]').should('contain', 'R$');
  });

  it('Deve salvar endereço para próximos pedidos', () => {
    cy.proceedToCheckout();
    
    // Preencher dados
    cy.get('[data-cy="checkout-name"]').type('João Silva');
    cy.get('[data-cy="checkout-cep"]').type('01310-100');
    cy.get('[data-cy="checkout-address"]').type('Rua Augusta, 123');
    
    // Marcar para salvar endereço
    cy.get('[data-cy="save-address"]').check();
    
    // Completar checkout
    cy.get('[data-cy="payment-cartao"]').click();
    cy.get('[data-cy="finalize-order"]').click();
    
    cy.waitForToast('Pedido realizado com sucesso');
    
    // Em próximo checkout, verificar que dados estão pré-preenchidos
    cy.addToCart();
    cy.proceedToCheckout();
    
    cy.get('[data-cy="checkout-name"]').should('have.value', 'João Silva');
    cy.get('[data-cy="checkout-cep"]').should('have.value', '01310-100');
    cy.get('[data-cy="checkout-address"]').should('have.value', 'Rua Augusta, 123');
  });
});
