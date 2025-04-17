// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-ajv-schema-validator'

// LOGIN

Cypress.Commands.add('login', (credenciais = {}) => {
  const apiUrl = Cypress.env('apiUrl')

  return cy.api({
    method: 'POST',
    url: `${apiUrl}/login`,
    body: credenciais,
    failOnStatusCode: false
  })
})

// USUARIOS

Cypress.Commands.add('addUsuario', (user = {}) => {
  return cy.api({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    body: user,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('listUsuarios', (params = {}) =>{
  return cy.api({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    qs: params,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('getUsuario', (id) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteUsuario', (id) => {
  cy.api({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
    failOnStatusCode: false
  })
})