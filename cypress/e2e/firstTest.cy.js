describe('render-test', () => {
  it('renders form', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-testid="cypress-form"]').should('exist');
  })

  it('renders table', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-testid="cypress-table"]').should('exist');
  })

  it("deleting info after save", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="cypress-form-button"]').then(($btn) => {
      $btn.on("click",() => {
        cy
          .get('[data-testid="cypress-form-name]')
          .should("exist")
          .should("have.text", "")
    });
    });
  })

 
})