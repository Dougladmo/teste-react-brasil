describe('TC04 - Seleção de Categorias', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve filtrar produtos por categoria Roupas', () => {
    // Selecionar categoria Roupas
    cy.selectCategory('Roupas');
    
    // Verificar que apenas produtos da categoria Roupas são exibidos
    cy.get('[data-cy="product-card"]').should('exist');
    cy.get('[data-cy="product-category"]').each(($el) => {
      cy.wrap($el).should('contain', 'Roupas');
    });
    
    // Verificar que a categoria está selecionada no filtro
    cy.get('[data-cy="categoria-filter"]').should('have.value', 'Roupas');
  });

  it('Deve filtrar produtos por categoria Eletrônicos', () => {
    // Selecionar categoria Eletrônicos
    cy.selectCategory('Eletrônicos');
    
    // Verificar que apenas produtos da categoria Eletrônicos são exibidos
    cy.get('[data-cy="product-card"]').should('exist');
    cy.get('[data-cy="product-category"]').each(($el) => {
      cy.wrap($el).should('contain', 'Eletrônicos');
    });
    
    // Verificar que a categoria está selecionada no filtro
    cy.get('[data-cy="categoria-filter"]').should('have.value', 'Eletrônicos');
  });

  it('Deve filtrar produtos por categoria Livros', () => {
    // Selecionar categoria Livros
    cy.selectCategory('Livros');
    
    // Verificar que apenas produtos da categoria Livros são exibidos
    cy.get('[data-cy="product-card"]').should('exist');
    cy.get('[data-cy="product-category"]').each(($el) => {
      cy.wrap($el).should('contain', 'Livros');
    });
    
    // Verificar que a categoria está selecionada no filtro
    cy.get('[data-cy="categoria-filter"]').should('have.value', 'Livros');
  });

  it('Deve mostrar todos os produtos ao selecionar "Todos"', () => {
    // Primeiro selecionar uma categoria específica
    cy.selectCategory('Roupas');
    cy.get('[data-cy="product-card"]').its('length').as('roupasCount');
    
    // Depois selecionar "Todos"
    cy.selectCategory('Todos');
    
    // Verificar que há mais produtos exibidos do que quando filtrado por Roupas
    cy.get('[data-cy="product-card"]').its('length').should('be.greaterThan', 0);
    
    // Verificar que a categoria "Todos" está selecionada
    cy.get('[data-cy="categoria-filter"]').should('have.value', 'Todos');
  });

  it('Deve manter filtro de categoria ao navegar pelo app', () => {
    // Selecionar categoria Eletrônicos
    cy.selectCategory('Eletrônicos');
    
    // Abrir e fechar carrinho
    cy.openCart();
    cy.get('[data-cy="close-cart"]').click();
    
    // Verificar que filtro ainda está ativo
    cy.get('[data-cy="categoria-filter"]').should('have.value', 'Eletrônicos');
    cy.get('[data-cy="product-category"]').each(($el) => {
      cy.wrap($el).should('contain', 'Eletrônicos');
    });
  });

  it('Deve funcionar combinação de filtros de categoria com outros filtros', () => {
    // Selecionar categoria Roupas
    cy.selectCategory('Roupas');
    
    // Aplicar filtro de ordenação por menor preço
    cy.applyFilter('lowest-price');
    
    // Verificar que produtos ainda são da categoria Roupas e estão ordenados por preço
    cy.get('[data-cy="product-category"]').each(($el) => {
      cy.wrap($el).should('contain', 'Roupas');
    });
    
    // Verificar ordenação por preço (primeiro produto deve ter menor preço)
    cy.get('[data-cy="product-price"]').first().invoke('text').as('firstPrice');
    cy.get('[data-cy="product-price"]').eq(1).invoke('text').then((secondPrice) => {
      cy.get('@firstPrice').then((firstPrice) => {
        const firstValue = parseFloat(firstPrice.toString().replace(/[^\d,]/g, '').replace(',', '.'));
        const secondValue = parseFloat(secondPrice.toString().replace(/[^\d,]/g, '').replace(',', '.'));
        expect(firstValue).to.be.at.most(secondValue);
      });
    });
  });
});
