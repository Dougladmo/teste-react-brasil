describe('TC00 - Setup Conta Padrão', () => {
  it('Deve criar conta padrão teste@teste.com se não existir', () => {
    cy.visit('/');
    
    // Tentar fazer login primeiro para ver se a conta já existe
    cy.get('[data-cy="login-email"]').type('teste@teste.com');
    cy.get('[data-cy="login-password"]').type('123456');
    cy.get('[data-cy="login-submit"]').click();
    
    // Se login for bem-sucedido, a conta já existe
    cy.get('body').then((body) => {
      if (body.find('[data-cy="lista-produtos"]').length > 0) {
        // Conta já existe e login foi bem-sucedido
        cy.log('✅ Conta teste@teste.com já existe e está funcionando');
        cy.get('[data-cy="lista-produtos"]').should('be.visible');
      } else {
        // Conta não existe, vamos criar
        cy.log('📝 Criando conta padrão teste@teste.com');
          // Ir para tela de registro
        cy.get('[data-cy="toggle-to-register"]').click();
        cy.get('[data-cy="register-form"]').should('be.visible');
        
        // Criar conta padrão
        cy.get('[data-cy="register-name"]').type('teste');
        cy.get('[data-cy="register-email"]').type('teste@teste.com');
        cy.get('[data-cy="register-password"]').type('123456');
        cy.get('[data-cy="register-confirm-password"]').type('123456');
        cy.get('[data-cy="register-submit"]').click();
        
        // Verificar redirecionamento para login
        cy.get('[data-cy="login-form"]').should('be.visible');
        cy.contains('Cadastro realizado com sucesso').should('be.visible');
        
        // Testar login com a conta criada
        cy.get('[data-cy="login-email"]').clear().type('teste@teste.com');
        cy.get('[data-cy="login-password"]').clear().type('123456');
        cy.get('[data-cy="login-submit"]').click();
        
        // Verificar que login foi bem-sucedido
        cy.get('[data-cy="lista-produtos"]').should('be.visible');
        cy.get('[data-cy="user-name"]').should('contain', 'teste@teste.com');
        
        cy.log('✅ Conta teste@teste.com criada com sucesso!');
      }
    });
  });

  it('Deve verificar que a conta padrão funciona corretamente', () => {
    // Usar o comando de login padrão
    cy.login();
    
    // Verificar que está logado
    cy.get('[data-cy="lista-produtos"]').should('be.visible');
    cy.get('[data-cy="user-name"]').should('contain', 'teste@teste.com');
    
    // Testar funcionalidades básicas
    cy.get('[data-cy="product-card"]').should('exist');
    
    // Testar carrinho
    cy.addToCart();
    cy.get('[data-cy="cart-count"]').should('contain', '1');
    
    // Testar logout
    cy.logout();
    cy.get('[data-cy="login-form"]').should('be.visible');
    
    cy.log('✅ Conta padrão teste@teste.com está funcionando perfeitamente!');
  });
});
