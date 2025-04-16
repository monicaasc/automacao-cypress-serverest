import schema from '../../fixtures/schemas/serverest-schema.json'

describe('API Login - ServerRest', () => {
  const apiUrl = Cypress.env('apiUrl')
  const { email, password } = Cypress.env('user')

  context('Credenciais válidas', () => {
    it('Deve autenticar com sucesso e retornar token', () => {

      cy.api({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: { email, password }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('authorization').and.not.be.empty
        expect(response.body.message).to.eq('Login realizado com sucesso')
      })
    })

    it('Retorno deve estar conforme schema esperado - Status 200', () => {
      cy.api({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: { email, password }
      }).validateSchema(schema, {endpoint: '/login', method: 'post', status: 200})
    })
  })

  context('Credenciais inválidas', () => {
    it('Deve retornar erro ao tentar autenticar', () => {
      cy.api({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: {
          email: 'invalido@qa.com',
          password: 'senhaerrada'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq('Email e/ou senha inválidos')
      })
    })

    it('Retorno deve estar conforme schema esperado - Status 401', () => {
      cy.api({
        method: 'POST',
        url: `${apiUrl}/login`,
        failOnStatusCode: false,
        body: {
          email: 'invalido@qa.com',
          password: 'senhaerrada'
        },
      }).validateSchema(schema, {endpoint: '/login', method: 'post', status: 401})
    })

  })
})
