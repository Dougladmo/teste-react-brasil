describe('TC02 - Registro de Usuário', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve registrar um novo usuário com sucesso e redirecionar para login', () => {
    const timestamp = Date.now();
    const testEmail = `usuario${timestamp}@teste.com`;
    
    // Ir para tela de registro
    cy.get('[data-cy="register-link"]').click();
    
    // Verificar se está na tela de registro
    cy.get('[data-cy="register-form"]').should('be.visible');
    
    // Preencher dados do registro
    cy.registerUser(
      'teste',
      testEmail,
      '123456',
      '123456'
    );
    
    // Verificar redirecionamento para login
    cy.get('[data-cy="login-form"]').should('be.visible');
    
    // Tentar fazer login com as credenciais criadas
    cy.login(testEmail, '123456');
    
    // Verificar se o login foi bem-sucedido
    cy.get('[data-cy="lista-produtos"]').should('be.visible');
    cy.get('[data-cy="user-name"]').should('contain', testEmail);
  });

  it('Deve criar conta padrão teste@teste.com', () => {
    // Verificar se a conta padrão já existe tentando fazer login
    cy.login('teste@teste.com', '123456');
    
    // Se chegou aqui, a conta já existe
    cy.get('[data-cy="lista-produtos"]').should('be.visible');
    cy.get('[data-cy="user-name"]').should('contain', 'teste@teste.com');
  });

  it('Deve mostrar erro quando senhas não coincidem', () => {
    cy.get('[data-cy="register-link"]').click();
    cy.get('[data-cy="register-form"]').should('be.visible');
    
    cy.get('[data-cy="register-name"]').type('teste');
    cy.get('[data-cy="register-email"]').type('teste_erro@email.com');
    cy.get('[data-cy="register-password"]').type('123456');
    cy.get('[data-cy="register-confirm-password"]').type('senha456');
    cy.get('[data-cy="register-submit"]').click();
    
    // Verificar que permanece na tela de registro
    cy.get('[data-cy="register-form"]').should('be.visible');
    // Verificar mensagem de erro
    cy.contains('As senhas não coincidem').should('be.visible');
  });

  it('Deve mostrar erro ao tentar registrar com email já existente', () => {
    cy.get('[data-cy="register-link"]').click();
    cy.get('[data-cy="register-form"]').should('be.visible');
    
    // Tentar registrar com email que já existe
    cy.get('[data-cy="register-name"]').type('teste');
    cy.get('[data-cy="register-email"]').type('teste@teste.com');
    cy.get('[data-cy="register-password"]').type('123456');
    cy.get('[data-cy="register-confirm-password"]').type('123456');
    cy.get('[data-cy="register-submit"]').click();
    
    // Verificar que permanece na tela de registro
    cy.get('[data-cy="register-form"]').should('be.visible');
    // Verificar mensagem de erro
    cy.contains('Email já cadastrado').should('be.visible');
  });

  it('Deve validar campos obrigatórios', () => {
    cy.get('[data-cy="register-link"]').click();
    cy.get('[data-cy="register-form"]').should('be.visible');
    
    // Tentar submeter formulário vazio
    cy.get('[data-cy="register-submit"]').click();
    
    // Verificar que permanece na tela de registro
    cy.get('[data-cy="register-form"]').should('be.visible');
  });
});
