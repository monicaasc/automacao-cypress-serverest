import schema from '../../fixtures/schemas/serverest-schema.json'

describe('API Login - ServerRest', () => {
  const apiUrl = Cypress.env('apiUrl')
  const { email, password } = Cypress.env('user')

  context('Login válido', () => {
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

  context('Login inválido', () => {
    it('Credenciais inválidas - Deve retornar erro ao tentar autenticar', () => {
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

    it('Campos obrigatórios - Deve retornar erro ao tentar autenticar', () => {
      cy.api({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: {
          email: '',
          password: ''
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.email).to.eq('email não pode ficar em branco')
        expect(response.body.password).to.eq('password não pode ficar em branco')
      })
    })

    it('Campos não informados - Deve retornar erro ao tentar autenticar', () => {
      cy.api({
        method: 'POST',
        url: `${apiUrl}/login`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.email).to.eq('email é obrigatório')
        expect(response.body.password).to.eq('password é obrigatório')
      })
    })

    it('Email inválido - Deve retornar erro ao tentar autenticar', () => {
      cy.api({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: {
          email: 'emailinvalido.com',
          password: '123'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.email).to.eq('email deve ser um email válido')

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
