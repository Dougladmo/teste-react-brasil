describe('TC06 - Carrinho de Compras', () => {
  beforeEach(() => {
    cy.login();
    // Aguarda o carregamento da página principal
    cy.wait(2000)
    
    // Verifica se o carrinho está vazio inicialmente
    cy.get('[data-cy="carrinho-contador"]').should('contain', '0')
  })
  it('Cenário 1: Adicionar um produto e remover', () => {
    cy.log('🛒 CENÁRIO 1: Teste com 1 produto')
    
    // Adiciona o primeiro produto ao carrinho
    cy.get('[data-cy="adicionar-carrinho"]').first().click()
    
    // Verifica se o contador do carrinho foi atualizado
    cy.get('[data-cy="carrinho-contador"]').should('contain', '1')
    
    // Abre o carrinho
    cy.get('[data-cy="abrir-carrinho"]').click()
    
    // Verifica se o carrinho sidebar está visível
    cy.get('[data-cy="carrinho-sidebar"]').should('be.visible')
    
    // Verifica se há exatamente 1 item no carrinho
    cy.get('[data-cy="item-carrinho"]').should('have.length', 1)
    
    // Verifica se o total do carrinho está visível
    cy.get('[data-cy="total-carrinho"]').should('be.visible').and('not.contain', 'R$ 0,00')
    
    // Remove o item do carrinho
    cy.get('[data-cy="remover-item"]').first().click()
    
    // Verifica se o carrinho está vazio
    cy.get('[data-cy="item-carrinho"]').should('have.length', 0)
    cy.get('[data-cy="carrinho-contador"]').should('contain', '0')
    
    // Fecha o carrinho
    cy.get('[data-cy="fechar-carrinho"]').click()
    
    cy.log('✅ Cenário 1 concluído: 1 produto adicionado e removido com sucesso')
  })

  it('Cenário 2: Adicionar dois produtos e remover ambos', () => {
    cy.log('🛒 CENÁRIO 2: Teste com 2 produtos')
      // Adiciona o primeiro produto
    cy.get('[data-cy="adicionar-carrinho"]').eq(0).click()
    cy.wait(1000)
    
    // Adiciona o segundo produto
    cy.get('[data-cy="adicionar-carrinho"]').eq(1).click()
    cy.wait(1000)
    
    // Verifica se o contador do carrinho mostra 2
    cy.get('[data-cy="carrinho-contador"]').should('contain', '2')
    
    // Abre o carrinho
    cy.get('[data-cy="abrir-carrinho"]').click()
    
    // Verifica se o carrinho sidebar está visível
    cy.get('[data-cy="carrinho-sidebar"]').should('be.visible')
    
    // Verifica se há exatamente 2 itens no carrinho
    cy.get('[data-cy="item-carrinho"]').should('have.length', 2)
    
    // Verifica se o total do carrinho reflete os 2 produtos
    cy.get('[data-cy="total-carrinho"]').should('be.visible').and('not.contain', 'R$ 0,00')
    
    // Remove o primeiro item
    cy.get('[data-cy="remover-item"]').first().click()
    cy.wait(1000)
    
    // Verifica se restou 1 item
    cy.get('[data-cy="item-carrinho"]').should('have.length', 1)
    cy.get('[data-cy="carrinho-contador"]').should('contain', '1')
    
    // Remove o segundo item
    cy.get('[data-cy="remover-item"]').first().click()
    cy.wait(1000)
    
    // Verifica se o carrinho está vazio
    cy.get('[data-cy="item-carrinho"]').should('have.length', 0)
    cy.get('[data-cy="carrinho-contador"]').should('contain', '0')
    
    // Fecha o carrinho
    cy.get('[data-cy="fechar-carrinho"]').click()
    
    cy.log('✅ Cenário 2 concluído: 2 produtos adicionados e removidos com sucesso')
  })

  it('Cenário 3: Adicionar três produtos e remover todos', () => {
    cy.log('🛒 CENÁRIO 3: Teste com 3 produtos')
      // Adiciona três produtos sequencialmente
    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy="adicionar-carrinho"]').eq(i).click()
      cy.wait(1000)
      
      // Verifica se o contador foi atualizado corretamente
      cy.get('[data-cy="carrinho-contador"]').should('contain', (i + 1).toString())
    }
    
    // Abre o carrinho
    cy.get('[data-cy="abrir-carrinho"]').click()
    
    // Verifica se o carrinho sidebar está visível
    cy.get('[data-cy="carrinho-sidebar"]').should('be.visible')
    
    // Verifica se há exatamente 3 itens no carrinho
    cy.get('[data-cy="item-carrinho"]').should('have.length', 3)
    
    // Verifica se o total do carrinho reflete os 3 produtos
    cy.get('[data-cy="total-carrinho"]').should('be.visible').and('not.contain', 'R$ 0,00')
    
    // Verifica se o botão de finalizar compra está habilitado
    cy.get('[data-cy="finalizar-compra"]').should('be.visible').and('not.be.disabled')
    
    // Remove todos os produtos um por um
    for (let i = 2; i >= 0; i--) {
      cy.get('[data-cy="remover-item"]').first().click()
      cy.wait(1000)
      
      // Verifica se a quantidade diminuiu corretamente
      if (i > 0) {
        cy.get('[data-cy="item-carrinho"]').should('have.length', i)
        cy.get('[data-cy="carrinho-contador"]').should('contain', i.toString())
      }
    }
    
    // Verifica se o carrinho está completamente vazio
    cy.get('[data-cy="item-carrinho"]').should('have.length', 0)
    cy.get('[data-cy="carrinho-contador"]').should('contain', '0')
    
    // Verifica se o botão de finalizar compra está desabilitado ou não visível
    cy.get('[data-cy="finalizar-compra"]').should('not.exist')
    
    // Fecha o carrinho
    cy.get('[data-cy="fechar-carrinho"]').click()
    
    cy.log('✅ Cenário 3 concluído: 3 produtos adicionados e removidos com sucesso')
  })

  it('Cenário Completo: Teste de workflow completo do carrinho', () => {
    cy.log('🛒 TESTE COMPLETO: Workflow completo do carrinho')
    
    // Fase 1: Adicionar produtos gradualmente
    cy.log('📦 Fase 1: Adicionando produtos gradualmente')
      // Adiciona 1 produto
    cy.get('[data-cy="adicionar-carrinho"]').eq(0).click()
    cy.get('[data-cy="carrinho-contador"]').should('contain', '1')
    cy.wait(1000)
    
    // Adiciona 2º produto
    cy.get('[data-cy="adicionar-carrinho"]').eq(1).click()
    cy.get('[data-cy="carrinho-contador"]').should('contain', '2')
    cy.wait(1000)
    
    // Adiciona 3º produto
    cy.get('[data-cy="adicionar-carrinho"]').eq(2).click()
    cy.get('[data-cy="carrinho-contador"]').should('contain', '3')
    cy.wait(1000)
    
    // Fase 2: Verificar estado do carrinho
    cy.log('🔍 Fase 2: Verificando estado do carrinho')
    
    // Abre o carrinho
    cy.get('[data-cy="abrir-carrinho"]').click()
    
    // Verifica todos os elementos do carrinho
    cy.get('[data-cy="carrinho-sidebar"]').should('be.visible')
    cy.get('[data-cy="item-carrinho"]').should('have.length', 3)
    cy.get('[data-cy="total-carrinho"]').should('be.visible').and('not.contain', 'R$ 0,00')
    cy.get('[data-cy="finalizar-compra"]').should('be.visible')
    
    // Fase 3: Remoção seletiva
    cy.log('🗑️ Fase 3: Remoção seletiva de produtos')
    
    // Remove 1 produto (deve restar 2)
    cy.get('[data-cy="remover-item"]').first().click()
    cy.wait(1000)
    cy.get('[data-cy="item-carrinho"]').should('have.length', 2)
    cy.get('[data-cy="carrinho-contador"]').should('contain', '2')
    
    // Fecha e reabre o carrinho para testar persistência
    cy.get('[data-cy="fechar-carrinho"]').click()
    cy.wait(1000)
    cy.get('[data-cy="abrir-carrinho"]').click()
    
    // Verifica se ainda há 2 produtos
    cy.get('[data-cy="item-carrinho"]').should('have.length', 2)
    
    // Fase 4: Limpeza completa
    cy.log('🧹 Fase 4: Limpeza completa do carrinho')
    
    // Remove todos os produtos restantes
    cy.get('[data-cy="remover-item"]').first().click()
    cy.wait(1000)
    cy.get('[data-cy="remover-item"]').first().click()
    cy.wait(1000)
    
    // Verifica se o carrinho está vazio
    cy.get('[data-cy="item-carrinho"]').should('have.length', 0)
    cy.get('[data-cy="carrinho-contador"]').should('contain', '0')
    
    // Fecha o carrinho
    cy.get('[data-cy="fechar-carrinho"]').click()
    
    cy.log('✅ Teste completo finalizado: Workflow do carrinho funcionando perfeitamente')
  })

  afterEach(() => {
    // Garante que o carrinho está limpo após cada teste
    cy.window().its('localStorage').invoke('removeItem', 'carrinho')
  })
})
