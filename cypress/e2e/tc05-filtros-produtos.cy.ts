describe('TC05 - Filtros de Produtos', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve filtrar produtos por nome/busca', () => {
    // Buscar por um termo específico
    cy.applyFilter('name', 'Camisa');
    
    // Verificar que produtos exibidos contêm o termo buscado
    cy.get('[data-cy="product-card"]').should('exist');
    cy.get('[data-cy="product-name"]').each(($el) => {
      cy.wrap($el).invoke('text').should('match', /Camisa/i);
    });
    
    // Verificar que o campo de busca contém o termo
    cy.get('[data-cy="search-input"]').should('have.value', 'Camisa');
  });

  it('Deve ordenar produtos por menor preço', () => {
    // Aplicar filtro de menor preço
    cy.applyFilter('lowest-price');
    
    // Verificar que produtos estão ordenados por menor preço
    cy.get('[data-cy="product-price"]').then(($prices) => {
      const prices = Array.from($prices).map(el => {
        const priceText = el.textContent || '';
        return parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
      });
      
      // Verificar se está ordenado crescente
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).to.be.at.most(prices[i + 1]);
      }
    });
    
    // Verificar que o filtro está selecionado
    cy.get('[data-cy="sort-filter"]').should('have.value', 'Menor Preço');
  });

  it('Deve ordenar produtos por maior preço', () => {
    // Aplicar filtro de maior preço
    cy.applyFilter('highest-price');
    
    // Verificar que produtos estão ordenados por maior preço
    cy.get('[data-cy="product-price"]').then(($prices) => {
      const prices = Array.from($prices).map(el => {
        const priceText = el.textContent || '';
        return parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
      });
      
      // Verificar se está ordenado decrescente
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).to.be.at.least(prices[i + 1]);
      }
    });
    
    // Verificar que o filtro está selecionado
    cy.get('[data-cy="sort-filter"]').should('have.value', 'Maior Preço');
  });

  it('Deve combinar filtros de categoria e ordenação', () => {
    // Selecionar categoria Eletrônicos
    cy.selectCategory('Eletrônicos');
    
    // Aplicar ordenação por menor preço
    cy.applyFilter('lowest-price');
    
    // Verificar que produtos são da categoria certa E estão ordenados
    cy.get('[data-cy="product-category"]').each(($el) => {
      cy.wrap($el).should('contain', 'Eletrônicos');
    });
    
    cy.get('[data-cy="product-price"]').then(($prices) => {
      const prices = Array.from($prices).map(el => {
        const priceText = el.textContent || '';
        return parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
      });
      
      // Verificar ordenação
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).to.be.at.most(prices[i + 1]);
      }
    });
  });

  it('Deve combinar busca por nome com categoria', () => {
    // Selecionar categoria Roupas
    cy.selectCategory('Roupas');
    
    // Buscar por termo específico
    cy.applyFilter('name', 'Camisa');
    
    // Verificar que produtos atendem ambos os critérios
    cy.get('[data-cy="product-card"]').should('exist');
    cy.get('[data-cy="product-category"]').each(($el) => {
      cy.wrap($el).should('contain', 'Roupas');
    });
    cy.get('[data-cy="product-name"]').each(($el) => {
      cy.wrap($el).invoke('text').should('match', /Camisa/i);
    });
  });

  it('Deve mostrar mensagem quando nenhum produto for encontrado', () => {
    // Buscar por termo que não existe
    cy.applyFilter('name', 'ProdutoInexistente123');
    
    // Verificar mensagem de nenhum produto encontrado
    cy.get('[data-cy="no-products"]').should('be.visible');
    cy.contains('Nenhum produto encontrado').should('be.visible');
  });

  it('Deve limpar filtros corretamente', () => {
    // Aplicar vários filtros
    cy.selectCategory('Roupas');
    cy.applyFilter('name', 'Camisa');
    cy.applyFilter('lowest-price');
    
    // Limpar filtros
    cy.get('[data-cy="clear-filters"]').click();
    
    // Verificar que filtros foram resetados
    cy.get('[data-cy="categoria-filter"]').should('have.value', 'Todos');
    cy.get('[data-cy="search-input"]').should('have.value', '');
    cy.get('[data-cy="sort-filter"]').should('have.value', 'Relevância');
    
    // Verificar que todos os produtos são exibidos novamente
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  it('Deve manter filtros após adicionar produto ao carrinho', () => {
    // Aplicar filtros
    cy.selectCategory('Eletrônicos');
    cy.applyFilter('lowest-price');
    
    // Adicionar produto ao carrinho
    cy.addToCart();
    
    // Verificar que filtros ainda estão ativos
    cy.get('[data-cy="categoria-filter"]').should('have.value', 'Eletrônicos');
    cy.get('[data-cy="sort-filter"]').should('have.value', 'Menor Preço');
    
    // Verificar que produtos ainda estão filtrados
    cy.get('[data-cy="product-category"]').each(($el) => {
      cy.wrap($el).should('contain', 'Eletrônicos');
    });
  });
});
