describe('TC03 - Logout de Usuário', () => {
  beforeEach(() => {
    // Fazer login antes de cada teste usando credenciais padrão
    cy.login();
  });

  it('Deve realizar logout com sucesso e retornar para tela de login', () => {
    // Verificar que está logado
    cy.get('[data-cy="lista-produtos"]').should('be.visible');
    cy.get('[data-cy="user-name"]').should('contain', 'teste@teste.com');
    
    // Realizar logout
    cy.logout();
    
    // Verificar redirecionamento para login
    cy.get('[data-cy="login-form"]').should('be.visible');
    
    // Verificar que não consegue acessar página de produtos sem estar logado
    cy.visit('/produtos');
    cy.get('[data-cy="login-form"]').should('be.visible');
  });

  it('Deve limpar dados do usuário após logout', () => {
    // Adicionar item ao carrinho antes do logout
    cy.addToCart();
    
    // Verificar que tem item no carrinho
    cy.openCart();
    cy.get('[data-cy="cart-items"]').should('exist');
    
    // Fazer logout
    cy.logout();
    
    // Fazer login novamente
    cy.login();
    
    // Verificar que o carrinho foi limpo
    cy.openCart();
    cy.get('[data-cy="empty-cart"]').should('be.visible');
  });

  it('Deve manter botão de logout visível enquanto logado', () => {
    // Verificar que botão de logout está visível
    cy.get('[data-cy="logout-button"]').should('be.visible');
    
    // Navegar pela aplicação
    cy.openCart();
    cy.get('[data-cy="logout-button"]').should('be.visible');
    
    // Selecionar categoria
    cy.selectCategory('Roupas');
    cy.get('[data-cy="logout-button"]').should('be.visible');
  });
});
