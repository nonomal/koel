import '@testing-library/cypress/add-commands'
import AUTWindow = Cypress.AUTWindow
import Chainable = Cypress.Chainable

function _login(dataFixture, redirectTo = '/'): Chainable<AUTWindow> {
  window.localStorage.setItem('api-token', 'mock-token')

  cy.intercept('api/data', {
    fixture: dataFixture
  })

  return cy.visit(redirectTo)
}

Cypress.Commands.add('$login', (redirectTo = '/') => _login('data.get.200.json', redirectTo))

Cypress.Commands.add('$loginAsNonAdmin', (redirectTo = '/') => _login('data-non-admin.get.200.json', redirectTo))

Cypress.Commands.add('$each', (dataset: Array<Array<any>>, callback: Function) => {
  dataset.forEach(args => callback(...args))
})

Cypress.Commands.add('$confirm', () => {
  cy.clock()
  cy.tick(100) // wait for the alert to show up
  cy.get('.alertify .ok')
    .click()
})