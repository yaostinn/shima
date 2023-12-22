describe('render-test', () => {
  it('renders form', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-testid="cypress-form"]').should('exist');
  })

  it('renders table', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-testid="cypress-table"]').should('exist');
  })

  it("clear form after save", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="cypress-form-name"]').type('2+2')
    cy.get('[data-testid="cypress-form-code"]').type('2+5')

    cy.get('[data-testid="cypress-form-button"]').click()

    cy.get('[data-testid="cypress-form-name"]').should('have.value', '')
    cy.get('[data-testid="cypress-form-code"]').should('have.value', '')
  })
})