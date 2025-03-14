describe('View Developer Info', () => {
  it('should display principal developer information', () => {
    cy.visit('/');
    cy.get('[data-cy="developer-name"]').should('be.visible');
    cy.get('[data-cy="developer-job"]').should('be.visible');
    cy.get('[data-cy="developer-description"]').should('be.visible');
    cy.get('[data-cy="developer-picture"]').should('be.visible');
    cy.get('[data-cy="linkedin-button"]').click();
    cy.url().should('include', 'linkedin.com');
    cy.get('[data-cy="cv-button"]').click();
  });
});
