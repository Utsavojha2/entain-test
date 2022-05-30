import user from '../fixtures/user.json'
/// <reference types="cypress" />

describe('User registration test', () => {
  it('User registration', () => {
    cy.visit('/');
    cy.get('input[type="text"]')
    .invoke('attr', 'placeholder')
    .should('contain', "Enter your username")

    cy.fixture('user.json').as('userJSON').then((userFixture) => {
      expect(user).to.deep.equal(userFixture)
      cy.get('input').type(userFixture.username)
    })
    cy.intercept({
      method: 'POST',
      url: '/users',
    }).as('postUsername');

    cy.get('button#submit-btn').click();
    cy.wait("@postUsername")
    .then(({ request, response }) => {
      expect(request.body).to.have.property('username')
      expect(request.headers).to.have.property('content-type')
      expect(response?.statusCode).to.eq(201)
      expect(response?.body).to.have.property('id')
      cy.url().should('include', `/board/${response?.body.id}`)
    })
  })

  it('Notes writing board section', () => {
    cy.contains('WhiteBoard');
    const randomMessageText = `Cy_${Cypress._.random(1000)}`;
    cy.get('input[type="text"]').type(randomMessageText)
    cy.get('button').click();
    cy.get('section#chat-section').should('contain', randomMessageText)
  })
});
