
describe('Teste de Integração Completa', () => {
  it('Deve executar fluxo completo: Login → Navegação → Carrinho → Checkout → Logout', () => {
    // 1. Login
    cy.visit('/')
    cy.get('[data-cy="login-email"]').type('standard_user@teste.com')
    cy.get('[data-cy="login-password"]').type('secret_sauce')
    cy.get('[data-cy="login-submit"]').click()
    
    // 2. Verificar página de produtos
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
    cy.get('[data-cy="produto-card"]').should('have.length.at.least', 1)
    
    // 3. Filtrar produtos por categoria
    cy.get('[data-cy="filtro-categoria"]').click()
    cy.contains('Eletrônicos').click()
    
    // 4. Ordenar por preço
    cy.get('[data-cy="ordenacao-produtos"]').click()
    cy.contains('Menor preço').click()
    
    // 5. Adicionar produtos ao carrinho
    cy.get('[data-cy="adicionar-carrinho"]').first().click()
    cy.get('[data-cy="adicionar-carrinho"]').eq(1).click()
    
    // 6. Verificar carrinho
    cy.get('[data-cy="carrinho-contador"]').should('contain', '2')
    
    // 7. Abrir carrinho e modificar quantidades
    cy.get('[data-cy="abrir-carrinho"]').click()
    cy.get('[data-cy="aumentar-quantidade"]').first().click()
    
    // 8. Verificar total
    cy.get('[data-cy="total-carrinho"]').should('be.visible')
    
    // 9. Iniciar checkout
    cy.get('[data-cy="finalizar-compra"]').click()
    
    // 10. Preencher dados
    cy.get('[data-cy="endereco-rua"]').type('Rua das Palmeiras, 456')
    cy.get('[data-cy="endereco-numero"]').type('456')
    cy.get('[data-cy="endereco-bairro"]').type('Jardim')
    cy.get('[data-cy="endereco-cidade"]').type('São Paulo')
    cy.get('[data-cy="endereco-cep"]').type('01234-567')
    
    // 11. Selecionar PIX
    cy.get('input[value="pix"]').click()
    cy.get('select').select('email')
    cy.get('[data-cy="chave-pix"]').should('be.visible')
    
    // 12. Finalizar (seria confirmado se tivesse dados reais)
    cy.get('[data-cy="confirmar-pedido"]').should('not.be.disabled')
    
    // 13. Fechar modal e fazer logout
    cy.get('button').contains('×').click()
    cy.get('[data-cy="fechar-carrinho"]').click()
    cy.get('[data-cy="logout-button"]').click()
    
    // 14. Verificar volta ao login
    cy.get('[data-cy="login-form"]').should('be.visible')
  })
})
