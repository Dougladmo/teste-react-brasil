
describe('TC04 - Teste de Ordenação de Lista (Manual)', () => {
  beforeEach(() => {
    // Login
    cy.visit('/')
    cy.get('[data-cy="login-email"]').type('standard_user@teste.com')
    cy.get('[data-cy="login-password"]').type('secret_sauce')
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="lista-produtos"]').should('be.visible')
  })
  
  it('Deve ordenar produtos por preço (menor para maior)', () => {
    // Selecionar ordenação por menor preço
    cy.get('[data-cy="ordenacao-produtos"]').click()
    cy.contains('Menor preço').click()
    
    // Verificar que os produtos estão ordenados corretamente
    cy.get('[data-cy="produto-preco"]').then($precos => {
      const precos = Array.from($precos).map(el => {
        const texto = el.textContent || ''
        return parseFloat(texto.replace('R$', '').replace('.', '').replace(',', '.'))
      })
      
      // Verificar se está em ordem crescente
      for (let i = 0; i < precos.length - 1; i++) {
        expect(precos[i]).to.be.lte(precos[i + 1])
      }
    })
  })
  
  it('Deve ordenar produtos por preço (maior para menor)', () => {
    // Selecionar ordenação por maior preço
    cy.get('[data-cy="ordenacao-produtos"]').click()
    cy.contains('Maior preço').click()
    
    // Verificar que os produtos estão ordenados corretamente
    cy.get('[data-cy="produto-preco"]').then($precos => {
      const precos = Array.from($precos).map(el => {
        const texto = el.textContent || ''
        return parseFloat(texto.replace('R$', '').replace('.', '').replace(',', '.'))
      })
      
      // Verificar se está em ordem decrescente
      for (let i = 0; i < precos.length - 1; i++) {
        expect(precos[i]).to.be.gte(precos[i + 1])
      }
    })
  })
  
  it('Deve ordenar produtos por nome', () => {
    // Selecionar ordenação por nome
    cy.get('[data-cy="ordenacao-produtos"]').click()
    cy.contains('Nome').click()
    
    // Verificar que os produtos estão ordenados alfabeticamente
    cy.get('[data-cy="produto-nome"]').then($nomes => {
      const nomes = Array.from($nomes).map(el => el.textContent || '')
      
      // Verificar se está em ordem alfabética
      for (let i = 0; i < nomes.length - 1; i++) {
        expect(nomes[i].localeCompare(nomes[i + 1])).to.be.lte(0)
      }
    })
  })
})
