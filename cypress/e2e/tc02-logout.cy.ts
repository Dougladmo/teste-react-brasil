<<<<<<< Updated upstream
describe('TC03 - Logout de Usuário', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve realizar logout com sucesso e retornar para tela de login', () => {
    cy.get('[data-cy="lista-produtos"]').should('be.visible');
    cy.get('[data-cy="user-name"]').should('contain', 'teste@teste.com');
=======

/// <reference types="cypress" />

describe('TC02 - Teste de Logout (Automatizado)', () => {
  beforeEach(() => {
    // Fazer login antes de cada teste
    cy.visit('/')
    cy.get('[data-cy="login-email"]').type('teste@teste.com')
    cy.get('[data-cy="login-password"]').type('123456')
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
  })
  
  it('Deve realizar logout corretamente e redirecionar para tela de login', () => {
    // Verificar que está logado
    cy.get('[data-cy="user-name"]').should('be.visible')
    cy.get('[data-cy="logout-button"]').should('be.visible')
>>>>>>> Stashed changes
    
    cy.logout();
    
    cy.get('[data-cy="login-form"]').should('be.visible');
    
    cy.visit('/produtos');
    cy.get('[data-cy="login-form"]').should('be.visible');
  });

  it('Deve limpar dados do usuário após logout', () => {
    cy.addToCart();
    
    cy.openCart();
    cy.get('[data-cy="cart-items"]').should('exist');
    
    cy.logout();
    
    cy.login();
    
    cy.openCart();
    cy.get('[data-cy="empty-cart"]').should('be.visible');
  });

  it('Deve manter botão de logout visível enquanto logado', () => {
    cy.get('[data-cy="logout-button"]').should('be.visible');
    
    cy.openCart();
    cy.get('[data-cy="logout-button"]').should('be.visible');
    
    cy.selectCategory('Roupas');
    cy.get('[data-cy="logout-button"]').should('be.visible');
  });
});
