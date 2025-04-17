import { loginFactory } from '../../support/factories/loginFactory'
import schema from '../../fixtures/schemas/serverest-schema.json'
import { MENSAGENS } from '../../support/messages'

describe('API Login - POST', () => {

  context('Login válido', () => {

    it('Deve autenticar com sucesso e retornar token', () => {
      const credenciais = loginFactory.valido()

      cy.login(credenciais).should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('authorization').and.not.be.empty
        expect(response.body.message).to.eq(MENSAGENS.LOGIN.SUCESSO)
      })
    })

    it('Retorno deve estar conforme schema esperado - Status 200', () => {
      const credenciais = loginFactory.valido()

      cy.login(credenciais).validateSchema(schema, {
        endpoint: '/login', method: 'post', status: 200
      })
    })
  })

  context('Login inválido', () => {

    it('Não deve autenticar com dados incorretos', () => {
      const credenciais = loginFactory.invalido()

      cy.login(credenciais).should((response) => {
        expect(response.status).to.eq(401)
        expect(response.body.message).to.eq(MENSAGENS.LOGIN.CREDENCIAIS_INVALIDAS)
      })
    })

    it('Não deve autenticar com campos em branco', () => {
      const credenciais = loginFactory.camposEmBranco()

      cy.login(credenciais).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.email).to.eq(MENSAGENS.GERAL.EM_BRANCO.EMAIL)
        expect(response.body.password).to.eq(MENSAGENS.GERAL.EM_BRANCO.SENHA)
      })
    })

    it('Campos não informados - Deve retornar erro ao tentar autenticar', () => {
      const credenciais = loginFactory.camposAusentes()

      cy.login(credenciais).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.email).to.eq(MENSAGENS.GERAL.OBRIGATORIO.EMAIL)
        expect(response.body.password).to.eq(MENSAGENS.GERAL.OBRIGATORIO.SENHA)
      })
    })

    it('Não deve autenticar com email em formato inválido', () => {
      const credenciais = loginFactory.emailInvalido()

      cy.login(credenciais).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.email).to.eq(MENSAGENS.GERAL.INVALIDO.EMAIL)

      })
    })

    it('Retorno deve estar conforme schema esperado - Status 401', () => {
      const credenciais = loginFactory.emailInvalido()

      cy.login(credenciais).validateSchema(schema, {
        endpoint: '/login', method: 'post', status: 401
      })
    })

  })
})
