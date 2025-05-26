describe('🚀 SUITE COMPLETA DE TESTES E-COMMERCE', () => {
  
  context('🔐 Autenticação', () => {
    // Importar e executar testes de login e registro
    require('./tc01-login-valido.cy.ts');
    require('./tc02-registro-usuario.cy.ts');
    require('./tc03-logout.cy.ts');
  });

  context('🛍️ Navegação e Produtos', () => {
    // Importar e executar testes de navegação
    require('./tc04-selecao-categorias.cy.ts');
    require('./tc05-filtros-produtos.cy.ts');
  });

  context('🛒 Carrinho de Compras', () => {
    // Importar e executar testes do carrinho
    require('./tc06-carrinho-funcionalidades.cy.ts');
  });

  context('💳 Checkout e Pagamento', () => {
    // Importar e executar testes de checkout
    require('./tc07-checkout-completo.cy.ts');
  });

  context('🎯 Fluxos Integrados', () => {
    // Importar e executar testes do fluxo completo
    require('./tc08-fluxo-completo-usuario.cy.ts');
  });

  // Teste final de smoke test
  it('🔍 SMOKE TEST - Verificar funcionalidades críticas', () => {
    cy.log('Executando smoke test das funcionalidades críticas...');
    
    // 1. Login básico
    cy.visit('/');
    cy.get('[data-cy="login-form"]').should('be.visible');
    cy.login('standard_user@teste.com', 'secret_sauce');
    cy.get('[data-cy="lista-produtos"]').should('be.visible');
    
    // 2. Produtos carregando
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
    
    // 3. Filtros funcionando
    cy.selectCategory('Roupas');
    cy.get('[data-cy="product-card"]').should('exist');
    
    // 4. Carrinho funcionando
    cy.addToCart();
    cy.get('[data-cy="cart-count"]').should('contain', '1');
    
    // 5. Checkout acessível
    cy.proceedToCheckout();
    cy.get('[data-cy="checkout-form"]').should('be.visible');
    
    // 6. Logout funcionando
    cy.get('[data-cy="back-to-products"]').click();
    cy.logout();
    cy.get('[data-cy="login-form"]').should('be.visible');
    
    cy.log('✅ Smoke test concluído - Todas as funcionalidades críticas estão operacionais!');
  });
});
