/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to simulate tab key press
     * @example cy.get('input').tab()
     */
    tab(options?: Partial<Cypress.TypeOptions>): Chainable<JQuery<HTMLElement>>;
      /**
     * Custom command to perform login
     * @example cy.login('user@test.com', 'password')
     * @example cy.login() // Uses default credentials
     */
    login(email?: string, password?: string): Chainable<Element>;
    
    /**
     * Custom command to perform logout
     * @example cy.logout()
     */
    logout(): Chainable<Element>;
      /**
     * Custom command to register a new user
     * @example cy.registerUser('New User', 'new@test.com', 'password')
     */
    registerUser(name: string, email: string, password: string, confirmPassword?: string): Chainable<Element>;
    
    /**
     * Custom command to select a category
     * @example cy.selectCategory('Roupas')
     */
    selectCategory(category: 'Roupas' | 'Eletrônicos' | 'Livros' | 'Todos'): Chainable<Element>;
    
    /**
     * Custom command to apply filters
     * @example cy.applyFilter('name', 'produto')
     */
    applyFilter(filterType: 'name' | 'lowest-price' | 'highest-price', searchTerm?: string): Chainable<Element>;
    
    /**
     * Custom command to add product to cart
     * @example cy.addToCart('product-1')
     */
    addToCart(productId?: string): Chainable<Element>;
    
    /**
     * Custom command to open cart sidebar
     * @example cy.openCart()
     */
    openCart(): Chainable<Element>;
    
    /**
     * Custom command to remove item from cart
     * @example cy.removeFromCart('product-1')
     */
    removeFromCart(productId: string): Chainable<Element>;
    
    /**
     * Custom command to clear entire cart
     * @example cy.clearCart()
     */
    clearCart(): Chainable<Element>;
    
    /**
     * Custom command to proceed to checkout
     * @example cy.proceedToCheckout()
     */
    proceedToCheckout(): Chainable<Element>;
    
    /**
     * Custom command to complete checkout process
     * @example cy.completeCheckout('João Silva', '12345-678', 'Rua A, 123', 'cartao')
     */
    completeCheckout(name: string, cep: string, address: string, paymentMethod: 'cartao' | 'pix' | 'boleto'): Chainable<Element>;
    
    /**
     * Custom command to wait for toast message
     * @example cy.waitForToast('Produto adicionado ao carrinho')
     */
    waitForToast(message?: string): Chainable<Element>;
  }
}

Cypress.Commands.add('tab', 
  { prevSubject: 'element' },
  (subject, options) => {
    cy.wrap(subject, options).trigger('keydown', {
      keyCode: 9,
      which: 9,
      force: true
    });
    return cy.wrap(subject, options);
  }
);

// Login command
Cypress.Commands.add('login', (email: string = 'teste@teste.com', password: string = '123456') => {
  cy.visit('/');
  cy.get('[data-cy="login-form"]').should('be.visible');
  cy.get('[data-cy="login-email"]').clear().type(email);
  cy.get('[data-cy="login-password"]').clear().type(password);
  cy.get('[data-cy="login-submit"]').click();
  cy.get('[data-cy="lista-produtos"]').should('be.visible');
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="logout-button"]').should('be.visible').click();
  cy.get('[data-cy="login-form"]').should('be.visible');
});

// Register user command
Cypress.Commands.add('registerUser', (name: string, email: string, password: string, confirmPassword?: string) => {
  cy.visit('/');
  cy.get('[data-cy="toggle-to-register"]').click();
  cy.get('[data-cy="register-form"]').should('be.visible');
  cy.get('[data-cy="register-name"]').clear().type(name);
  cy.get('[data-cy="register-email"]').clear().type(email);
  cy.get('[data-cy="register-password"]').clear().type(password);
  // Nota: RegisterForm não tem campo de confirmação de senha
  cy.get('[data-cy="register-submit"]').click();
  
  // Wait for success message and redirect to login
  cy.contains('Conta criada com sucesso!').should('be.visible');
  cy.wait(2000); // Wait for automatic redirect
  cy.get('[data-cy="login-form"]').should('be.visible');
});

// Select category command
Cypress.Commands.add('selectCategory', (category: 'Roupas' | 'Eletrônicos' | 'Livros' | 'Todos') => {
  cy.get('[data-cy="categoria-filter"]').select(category);
  cy.wait(500); // Wait for filter to apply
});

// Apply filter command
Cypress.Commands.add('applyFilter', (filterType: 'name' | 'lowest-price' | 'highest-price', searchTerm?: string) => {
  if (filterType === 'name' && searchTerm) {
    cy.get('[data-cy="search-input"]').clear().type(searchTerm);
    cy.get('[data-cy="search-button"]').click();
  } else if (filterType === 'lowest-price') {
    cy.get('[data-cy="sort-filter"]').select('Menor Preço');
  } else if (filterType === 'highest-price') {
    cy.get('[data-cy="sort-filter"]').select('Maior Preço');
  }
  cy.wait(500); // Wait for filter to apply
});

// Add to cart command
Cypress.Commands.add('addToCart', (productId?: string) => {
  if (productId) {
    cy.get(`[data-cy="add-to-cart-${productId}"]`).click();
  } else {
    cy.get('[data-cy^="add-to-cart-"]').first().click();
  }
  cy.waitForToast('Produto adicionado ao carrinho');
});

// Open cart command
Cypress.Commands.add('openCart', () => {
  cy.get('[data-cy="cart-button"]').click();
  cy.get('[data-cy="cart-sidebar"]').should('be.visible');
});

// Remove from cart command
Cypress.Commands.add('removeFromCart', (productId: string) => {
  cy.openCart();
  cy.get(`[data-cy="remove-from-cart-${productId}"]`).click();
  cy.waitForToast('Produto removido do carrinho');
});

// Clear cart command
Cypress.Commands.add('clearCart', () => {
  cy.openCart();
  cy.get('[data-cy="clear-cart-button"]').click();
  cy.get('[data-cy="confirm-clear-cart"]').click();
  cy.waitForToast('Carrinho limpo com sucesso');
});

// Proceed to checkout command
Cypress.Commands.add('proceedToCheckout', () => {
  cy.openCart();
  cy.get('[data-cy="checkout-button"]').should('be.visible').click();
  cy.get('[data-cy="checkout-form"]').should('be.visible');
});

// Complete checkout command
Cypress.Commands.add('completeCheckout', (name: string, cep: string, address: string, paymentMethod: 'cartao' | 'pix' | 'boleto') => {
  cy.get('[data-cy="checkout-name"]').clear().type(name);
  cy.get('[data-cy="checkout-cep"]').clear().type(cep);
  cy.get('[data-cy="checkout-address"]').clear().type(address);
  cy.get(`[data-cy="payment-${paymentMethod}"]`).click();
  cy.get('[data-cy="finalize-order"]').click();
  cy.waitForToast('Pedido realizado com sucesso');
});

// Wait for toast message command
Cypress.Commands.add('waitForToast', (message?: string) => {
  if (message) {
    cy.contains(message).should('be.visible');
  } else {
    cy.get('.toast, .notification, [data-cy="toast"]').should('be.visible');
  }
  cy.wait(1000); // Wait for toast to disappear
});
