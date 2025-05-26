describe('TC08 - Fluxo Completo do Usuário', () => {
  const timestamp = Date.now();
  const testUser = {
    name: 'teste',
    email: `usuario_completo_${timestamp}@teste.com`,
    password: '123456'
  };

  it('Deve executar jornada completa: registro → login → navegação → compra → logout', () => {
    // 1. REGISTRO
    cy.log('🔵 FASE 1: Registrando novo usuário');
    cy.registerUser(testUser.name, testUser.email, testUser.password, testUser.password);
    
    // 2. LOGIN
    cy.log('🔵 FASE 2: Fazendo login');
    cy.login(testUser.email, testUser.password);
    
    // 3. NAVEGAÇÃO E FILTROS
    cy.log('🔵 FASE 3: Explorando produtos e filtros');
    
    // Explorar categorias
    cy.selectCategory('Roupas');
    cy.get('[data-cy="product-card"]').should('exist');
    
    cy.selectCategory('Eletrônicos');
    cy.get('[data-cy="product-card"]').should('exist');
    
    cy.selectCategory('Livros');
    cy.get('[data-cy="product-card"]').should('exist');
    
    // Testar busca
    cy.selectCategory('Todos');
    cy.applyFilter('name', 'Camisa');
    cy.get('[data-cy="product-card"]').should('exist');
    
    // Limpar busca e testar ordenação
    cy.get('[data-cy="clear-filters"]').click();
    cy.applyFilter('lowest-price');
    
    // 4. COMPRAS - ADICIONAR PRODUTOS AO CARRINHO
    cy.log('🔵 FASE 4: Adicionando produtos ao carrinho');
    
    // Adicionar 3 produtos diferentes
    cy.get('[data-cy^="add-to-cart-"]').eq(0).click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    cy.get('[data-cy^="add-to-cart-"]').eq(1).click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    cy.get('[data-cy^="add-to-cart-"]').eq(2).click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Verificar carrinho
    cy.get('[data-cy="cart-count"]').should('contain', '3');
    
    // 5. GERENCIAR CARRINHO
    cy.log('🔵 FASE 5: Gerenciando carrinho');
    
    cy.openCart();
    cy.get('[data-cy="cart-item"]').should('have.length', 3);
    
    // Remover um item
    cy.get('[data-cy^="remove-from-cart-"]').first().click();
    cy.waitForToast('Produto removido do carrinho');
    cy.get('[data-cy="cart-item"]').should('have.length', 2);
    
    // Alterar quantidade se disponível
    cy.get('[data-cy="increase-quantity"]').first().then(($btn) => {
      if ($btn.length > 0) {
        cy.wrap($btn).click();
      }
    });
    
    // 6. CHECKOUT
    cy.log('🔵 FASE 6: Realizando checkout');
    
    cy.proceedToCheckout();
    
    // Completar checkout com cartão
    cy.completeCheckout(
      testUser.name,
      '01310-100',
      'Rua Augusta, 123 - Consolação, São Paulo - SP',
      'cartao'
    );
    
    // Verificar confirmação
    cy.get('[data-cy="order-confirmation"]').should('be.visible');
    cy.contains('Pedido realizado com sucesso').should('be.visible');
    cy.get('[data-cy="order-number"]').should('be.visible');
    
    // Verificar que carrinho foi limpo
    cy.get('[data-cy="cart-count"]').should('contain', '0');
    
    // 7. FAZER NOVA COMPRA RÁPIDA
    cy.log('🔵 FASE 7: Segunda compra (mais rápida)');
    
    // Voltar para produtos
    cy.get('[data-cy="continue-shopping"]').click();
    cy.get('[data-cy="lista-produtos"]').should('be.visible');
    
    // Fazer compra rápida
    cy.selectCategory('Eletrônicos');
    cy.addToCart();
    
    cy.proceedToCheckout();
    
    // Dados devem estar salvos do checkout anterior
    cy.get('[data-cy="checkout-name"]').should('have.value', testUser.name);
    
    // Selecionar PIX desta vez
    cy.get('[data-cy="payment-pix"]').click();
    cy.get('[data-cy="finalize-order"]').click();
    
    cy.waitForToast('Pedido realizado com sucesso');
    
    // 8. VERIFICAR HISTÓRICO DE PEDIDOS
    cy.log('🔵 FASE 8: Verificando histórico');
    
    cy.get('[data-cy="user-menu"]').click();
    cy.get('[data-cy="order-history"]').click();
    
    // Deve ter 2 pedidos
    cy.get('[data-cy="order-item"]').should('have.length', 2);
    
    // 9. LOGOUT
    cy.log('🔵 FASE 9: Fazendo logout');
    
    cy.logout();
    
    // Verificar que está na tela de login
    cy.get('[data-cy="login-form"]').should('be.visible');
    
    // Verificar que não consegue acessar área restrita
    cy.visit('/produtos');
    cy.get('[data-cy="login-form"]').should('be.visible');
    
    cy.log('✅ FLUXO COMPLETO FINALIZADO COM SUCESSO!');
  });
  it('Deve testar fluxo com diferentes métodos de pagamento', () => {
    // Preparar usuário e produtos
    cy.registerUser(
      'teste',
      `usuario_pag_${timestamp}@teste.com`,
      '123456',
      '123456'
    );
    cy.login(`usuario_pag_${timestamp}@teste.com`, '123456');
    
    // Teste 1: Pagamento com Cartão
    cy.log('💳 Teste: Cartão de Crédito');
    cy.addToCart();
    cy.proceedToCheckout();
    cy.completeCheckout('João Silva', '01310-100', 'Rua A, 123', 'cartao');
    cy.get('[data-cy="order-confirmation"]').should('be.visible');
    
    // Teste 2: Pagamento com PIX
    cy.log('📱 Teste: PIX');
    cy.get('[data-cy="continue-shopping"]').click();
    cy.addToCart();
    cy.proceedToCheckout();
    cy.completeCheckout('João Silva', '01310-100', 'Rua A, 123', 'pix');
    cy.get('[data-cy="order-confirmation"]').should('be.visible');
    
    // Teste 3: Pagamento com Boleto
    cy.log('🧾 Teste: Boleto');
    cy.get('[data-cy="continue-shopping"]').click();
    cy.addToCart();
    cy.proceedToCheckout();
    cy.completeCheckout('João Silva', '01310-100', 'Rua A, 123', 'boleto');
    cy.get('[data-cy="order-confirmation"]').should('be.visible');
    
    // Verificar histórico tem 3 pedidos
    cy.get('[data-cy="user-menu"]').click();
    cy.get('[data-cy="order-history"]').click();
    cy.get('[data-cy="order-item"]').should('have.length', 3);
  });
  it('Deve testar fluxo com carrinho complexo', () => {
    cy.login();
    
    cy.log('🛒 Teste: Carrinho Complexo');
    
    // Adicionar produtos de categorias diferentes
    cy.selectCategory('Roupas');
    cy.addToCart();
    
    cy.selectCategory('Eletrônicos');
    cy.addToCart();
    
    cy.selectCategory('Livros');
    cy.addToCart();
    
    // Voltar para todos e adicionar mais um
    cy.selectCategory('Todos');
    cy.get('[data-cy^="add-to-cart-"]').eq(5).click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Verificar carrinho complexo
    cy.openCart();
    cy.get('[data-cy="cart-item"]').should('have.length', 4);
    
    // Testar alteração de quantidades
    cy.get('[data-cy="increase-quantity"]').each(($btn) => {
      cy.wrap($btn).click();
    });
    
    // Remover alguns itens
    cy.get('[data-cy^="remove-from-cart-"]').first().click();
    cy.waitForToast('Produto removido do carrinho');
    
    cy.get('[data-cy^="remove-from-cart-"]').first().click();
    cy.waitForToast('Produto removido do carrinho');
    
    // Verificar total e finalizar
    cy.get('[data-cy="cart-total"]').should('be.visible');
    cy.proceedToCheckout();
    cy.completeCheckout('Maria Silva', '04567-890', 'Av. Paulista, 456', 'cartao');
    cy.get('[data-cy="order-confirmation"]').should('be.visible');
  });
  it('Deve testar cenários de erro e recuperação', () => {
    cy.login();
    
    cy.log('⚠️ Teste: Cenários de Erro');
    
    // Adicionar produto
    cy.addToCart();
    
    // Tentar checkout com dados inválidos
    cy.proceedToCheckout();
    cy.get('[data-cy="finalize-order"]').click();
    
    // Verificar erros de validação
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('CEP é obrigatório').should('be.visible');
    
    // Corrigir alguns dados mas deixar erro no CEP
    cy.get('[data-cy="checkout-name"]').type('João Silva');
    cy.get('[data-cy="checkout-cep"]').type('123'); // CEP inválido
    cy.get('[data-cy="checkout-address"]').type('Rua A, 123');
    cy.get('[data-cy="payment-cartao"]').click();
    cy.get('[data-cy="finalize-order"]').click();
    
    // Verificar erro específico do CEP
    cy.contains('CEP deve ter 8 dígitos').should('be.visible');
    
    // Corrigir e finalizar
    cy.get('[data-cy="checkout-cep"]').clear().type('01310-100');
    cy.get('[data-cy="finalize-order"]').click();
    
    cy.waitForToast('Pedido realizado com sucesso');
    cy.get('[data-cy="order-confirmation"]').should('be.visible');
    
    cy.log('✅ Cenários de erro testados e recuperados com sucesso!');
  });
});
