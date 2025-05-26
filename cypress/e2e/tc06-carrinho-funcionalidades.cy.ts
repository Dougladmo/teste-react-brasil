describe('TC06 - Funcionalidades do Carrinho', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve adicionar produto ao carrinho com sucesso', () => {
    // Adicionar produto ao carrinho
    cy.addToCart();
    
    // Verificar que contador do carrinho aumentou
    cy.get('[data-cy="cart-count"]').should('contain', '1');
    
    // Abrir carrinho e verificar produto
    cy.openCart();
    cy.get('[data-cy="cart-items"]').should('exist');
    cy.get('[data-cy="cart-item"]').should('have.length', 1);
  });

  it('Deve adicionar múltiplos produtos ao carrinho', () => {
    // Adicionar primeiro produto
    cy.get('[data-cy^="add-to-cart-"]').first().click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Adicionar segundo produto
    cy.get('[data-cy^="add-to-cart-"]').eq(1).click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Adicionar terceiro produto
    cy.get('[data-cy^="add-to-cart-"]').eq(2).click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Verificar contador do carrinho
    cy.get('[data-cy="cart-count"]').should('contain', '3');
    
    // Verificar itens no carrinho
    cy.openCart();
    cy.get('[data-cy="cart-item"]').should('have.length', 3);
  });

  it('Deve exibir informações corretas do produto no carrinho', () => {
    // Pegar informações do primeiro produto antes de adicionar
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="product-name"]').invoke('text').as('productName');
      cy.get('[data-cy="product-price"]').invoke('text').as('productPrice');
      cy.get('[data-cy="product-image"]').invoke('attr', 'src').as('productImage');
    });
    
    // Adicionar produto ao carrinho
    cy.get('[data-cy^="add-to-cart-"]').first().click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Verificar informações no carrinho
    cy.openCart();
    cy.get('[data-cy="cart-item"]').first().within(() => {
      cy.get('@productName').then((name) => {
        cy.get('[data-cy="cart-item-name"]').should('contain', name);
      });
      cy.get('@productPrice').then((price) => {
        cy.get('[data-cy="cart-item-price"]').should('contain', price);
      });
      cy.get('@productImage').then((src) => {
        cy.get('[data-cy="cart-item-image"]').should('have.attr', 'src', src);
      });
    });
  });

  it('Deve calcular total do carrinho corretamente', () => {
    // Adicionar produtos específicos e calcular total esperado
    let totalEsperado = 0;
    
    // Adicionar primeiro produto
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="product-price"]').invoke('text').then((price) => {
        const valor = parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'));
        totalEsperado += valor;
        cy.get('[data-cy^="add-to-cart-"]').click();
      });
    });
    
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Adicionar segundo produto
    cy.get('[data-cy="product-card"]').eq(1).within(() => {
      cy.get('[data-cy="product-price"]').invoke('text').then((price) => {
        const valor = parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'));
        totalEsperado += valor;
        cy.get('[data-cy^="add-to-cart-"]').click();
      });
    });
    
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Verificar total no carrinho
    cy.openCart();
    cy.get('[data-cy="cart-total"]').invoke('text').then((totalText) => {
      const totalCarrinho = parseFloat(totalText.replace(/[^\d,]/g, '').replace(',', '.'));
      expect(totalCarrinho).to.equal(totalEsperado);
    });
  });

  it('Deve remover produto específico do carrinho', () => {
    // Adicionar dois produtos
    cy.get('[data-cy^="add-to-cart-"]').first().click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    cy.get('[data-cy^="add-to-cart-"]').eq(1).click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Verificar que tem 2 itens
    cy.get('[data-cy="cart-count"]').should('contain', '2');
    
    // Abrir carrinho e remover primeiro item
    cy.openCart();
    cy.get('[data-cy="cart-item"]').first().within(() => {
      cy.get('[data-cy^="remove-from-cart-"]').click();
    });
    
    cy.waitForToast('Produto removido do carrinho');
    
    // Verificar que restou apenas 1 item
    cy.get('[data-cy="cart-count"]').should('contain', '1');
    cy.get('[data-cy="cart-item"]').should('have.length', 1);
  });

  it('Deve limpar todo o carrinho', () => {
    // Adicionar vários produtos
    cy.get('[data-cy^="add-to-cart-"]').first().click();
    cy.waitForToast('Produto adicionado ao carrinho');
    cy.get('[data-cy^="add-to-cart-"]').eq(1).click();
    cy.waitForToast('Produto adicionado ao carrinho');
    cy.get('[data-cy^="add-to-cart-"]').eq(2).click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Verificar que tem itens no carrinho
    cy.get('[data-cy="cart-count"]').should('contain', '3');
    
    // Limpar carrinho
    cy.clearCart();
    
    // Verificar que carrinho está vazio
    cy.get('[data-cy="cart-count"]').should('contain', '0');
    cy.openCart();
    cy.get('[data-cy="empty-cart"]').should('be.visible');
    cy.contains('Seu carrinho está vazio').should('be.visible');
  });

  it('Deve alterar quantidade de produto no carrinho', () => {
    // Adicionar produto
    cy.addToCart();
    
    // Abrir carrinho
    cy.openCart();
    
    // Aumentar quantidade
    cy.get('[data-cy="increase-quantity"]').first().click();
    cy.get('[data-cy="item-quantity"]').first().should('contain', '2');
    
    // Verificar que total foi atualizado
    cy.get('[data-cy="cart-count"]').should('contain', '2');
    
    // Diminuir quantidade
    cy.get('[data-cy="decrease-quantity"]').first().click();
    cy.get('[data-cy="item-quantity"]').first().should('contain', '1');
    cy.get('[data-cy="cart-count"]').should('contain', '1');
  });

  it('Deve manter carrinho após navegar pela aplicação', () => {
    // Adicionar produto ao carrinho
    cy.addToCart();
    
    // Navegar por diferentes seções
    cy.selectCategory('Roupas');
    cy.get('[data-cy="cart-count"]').should('contain', '1');
    
    cy.selectCategory('Eletrônicos');
    cy.get('[data-cy="cart-count"]').should('contain', '1');
    
    cy.applyFilter('lowest-price');
    cy.get('[data-cy="cart-count"]').should('contain', '1');
    
    // Verificar que item ainda está no carrinho
    cy.openCart();
    cy.get('[data-cy="cart-item"]').should('have.length', 1);
  });

  it('Deve fechar carrinho sidebar corretamente', () => {
    // Abrir carrinho
    cy.openCart();
    cy.get('[data-cy="cart-sidebar"]').should('be.visible');
    
    // Fechar usando botão X
    cy.get('[data-cy="close-cart"]').click();
    cy.get('[data-cy="cart-sidebar"]').should('not.be.visible');
    
    // Abrir novamente
    cy.openCart();
    cy.get('[data-cy="cart-sidebar"]').should('be.visible');
    
    // Fechar clicando fora (overlay)
    cy.get('[data-cy="cart-overlay"]').click({ force: true });
    cy.get('[data-cy="cart-sidebar"]').should('not.be.visible');
  });

  it('Deve impedir adicionar mesmo produto múltiplas vezes', () => {
    // Adicionar produto
    cy.get('[data-cy^="add-to-cart-"]').first().as('addButton');
    cy.get('@addButton').click();
    cy.waitForToast('Produto adicionado ao carrinho');
    
    // Tentar adicionar o mesmo produto novamente
    cy.get('@addButton').click();
    
    // Verificar que mostra mensagem apropriada ou botão está desabilitado
    cy.get('@addButton').should('be.disabled')
      .or('contain', 'Adicionado')
      .or('contain', 'No Carrinho');
    
    // Verificar que quantidade no carrinho não dobrou indevidamente
    cy.get('[data-cy="cart-count"]').should('contain', '1');
  });
});
