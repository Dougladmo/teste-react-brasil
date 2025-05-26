describe('Debug - Verificar elementos existentes', () => {
  it('Deve listar todos os elementos com data-cy disponíveis', () => {
    cy.visit('/');
    
    // Aguardar a página carregar
    cy.wait(2000);
    
    // Listar todos os elementos com data-cy
    cy.get('body').then($body => {
      const elementosComDataCy = $body.find('[data-cy]');
      cy.log(`Encontrados ${elementosComDataCy.length} elementos com data-cy:`);
      
      elementosComDataCy.each((index, element) => {
        const dataCy = Cypress.$(element).attr('data-cy');
        const tagName = element.tagName.toLowerCase();
        cy.log(`${index + 1}. <${tagName} data-cy="${dataCy}">`);
      });
    });
    
    // Verificar se existem campos de login
    cy.get('body').should('contain', 'Login');
    
    // Tentar encontrar elementos de input
    cy.get('input').each($input => {
      const placeholder = $input.attr('placeholder');
      const type = $input.attr('type');
      const dataCy = $input.attr('data-cy');
      cy.log(`Input encontrado: type="${type}", placeholder="${placeholder}", data-cy="${dataCy}"`);
    });
  });
  
  it('Deve verificar estrutura da página de registro', () => {
    cy.visit('/');
    cy.wait(1000);
    
    // Procurar link ou botão para registro
    cy.get('body').then($body => {
      if ($body.find('a:contains("registro")').length > 0) {
        cy.log('Encontrado link "registro"');
        cy.get('a:contains("registro")').click();
      } else if ($body.find('button:contains("registro")').length > 0) {
        cy.log('Encontrado botão "registro"');
        cy.get('button:contains("registro")').click();
      } else if ($body.find('a:contains("Registro")').length > 0) {
        cy.log('Encontrado link "Registro"');
        cy.get('a:contains("Registro")').click();
      } else if ($body.find('button:contains("Cadastr")').length > 0) {
        cy.log('Encontrado botão com "Cadastr"');
        cy.get('button:contains("Cadastr")').first().click();
      } else {
        cy.log('Não encontrou link de registro óbvio');
        // Listar todos os textos de links e botões
        cy.get('a, button').each($el => {
          const text = $el.text().trim();
          if (text) {
            cy.log(`Elemento clickável: "${text}"`);
          }
        });
      }
    });
    
    cy.wait(1000);
    
    // Verificar inputs após possível navegação
    cy.get('input').each($input => {
      const placeholder = $input.attr('placeholder');
      const type = $input.attr('type');
      const dataCy = $input.attr('data-cy');
      cy.log(`Input na tela: type="${type}", placeholder="${placeholder}", data-cy="${dataCy}"`);
    });
  });
});
