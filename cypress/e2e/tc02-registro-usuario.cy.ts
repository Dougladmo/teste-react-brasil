describe('TC02 - Registro de Usuário', () => {
  it('Deve criar conta teste@teste.com e fazer login com sucesso', () => {
    cy.visit('/');
    
    cy.log('📝 Criando conta teste@teste.com');
    
    // 1. PRIMEIRO: Ir para tela de registro
    cy.get('[data-cy="toggle-to-register"]').click();
    cy.get('[data-cy="register-form"]').should('be.visible');
      // 2. Preencher dados do registro
    cy.get('[data-cy="register-name"]').type('teste');
    cy.get('[data-cy="register-email"]').type('teste@teste.com');
    cy.get('[data-cy="register-password"]').type('123456');
    cy.get('[data-cy="register-submit"]').click();
      // 3. Verificar redirecionamento para login
    cy.contains('Conta criada com sucesso!').should('be.visible');
    cy.wait(2000); // Wait for automatic redirect
    cy.get('[data-cy="login-form"]').should('be.visible');
    
    cy.log('✅ Conta criada! Agora fazendo login...');
    
    // 4. DEPOIS: Fazer login com a conta criada
    cy.get('[data-cy="login-email"]').clear().type('teste@teste.com');
    cy.get('[data-cy="login-password"]').clear().type('123456');
    cy.get('[data-cy="login-submit"]').click();
      // 5. Verificar que login foi bem-sucedido
    cy.get('[data-cy="lista-produtos"]').should('be.visible');
    cy.get('[data-cy="user-name"]').should('contain', 'teste'); // Nome do usuário, não o email
    
    cy.log('✅ Login realizado com sucesso!');
  });
});
