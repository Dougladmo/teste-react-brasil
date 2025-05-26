/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to simulate tab key press
     * @example cy.get('input').tab()
     */
    tab(options?: Partial<Cypress.TypeOptions>): Chainable<JQuery<HTMLElement>>;
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
