describe('API Login - ServerRest', () => {
  const apiUrl = Cypress.env('apiUrl')

  context('Credenciais válidas', () => {
    it('Deve autenticar com sucesso e retornar token', () => {
      const { email, password } = Cypress.env('user')

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
  })
})
