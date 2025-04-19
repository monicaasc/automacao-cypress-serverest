import { userFactory } from '../../support/factories/userFactory'
import schema from '../../fixtures/schemas/serverest-schema.json'
import { MENSAGENS } from '../../support/messages'


describe('API Usuarios', () => {
  const apiUrl = Cypress.env('apiUrl')

  context('GET Usuarios - Listagem', () => {
    const usuario = userFactory.valido()

    before(() => {
      cy.addUsuario(usuario).should((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      })
    })

    it('Retorno da busca por senha', () => { //TODO  Pesquisa por senha 👀 - Validaria essa possivel falha de segurança com o time de PO
      const params = { password: usuario.password }

      cy.listUsuarios(params).should((response) => {
        expect(response.status).to.eq(200)

        const usuarioEncontrado = response.body.usuarios.find(user => user.email === usuario.email)
        expect(usuarioEncontrado.nome).to.eq(usuario.nome)
        expect(usuarioEncontrado.email).to.eq(usuario.email)
      })
    })

    it('Busca por Nome', {tags: ['@smoke', '@regression']}, () => {
      const params = { nome: usuario.nome }

      // Faz a validação
      cy.listUsuarios(params).should((response) => {
        expect(response.status).to.eq(200)

        const usuarioEncontrado = response.body.usuarios.find(user => user.email === usuario.email)
        expect(usuarioEncontrado).to.include({
          nome: usuario.nome,
          email: usuario.email,
          administrador: usuario.administrador
        })
      })
    })

    it('Busca por Email', {tags: '@regression'}, () => {
      const params = { email: usuario.email }

      // Faz a validação
      cy.listUsuarios(params).should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.eq(1)

        const usuarioEncontrado = response.body.usuarios.find(user => user.email === usuario.email)
        expect(usuarioEncontrado).to.include({
          nome: usuario.nome,
          email: usuario.email,
          administrador: usuario.administrador
        })
      })
    })

    it('Registro não encontrado', {tags: '@regression'}, () => {
      const params = {nome: 'Not Found', email: 'notfound@404.com'}
      cy.listUsuarios(params).should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.eq(0)
        expect(response.body.usuarios).to.be.an('array').that.is.empty
      })
    })

    it('Retorno deve estar conforme schema esperado - Status 200', {tags: '@regression'}, () => {
      cy.api({
        method: 'GET',
        url: `${apiUrl}/usuarios`
      }).validateSchema(schema, {
        endpoint: '/usuarios', method: 'get', status: 200
      })
    })

  })

  context('GET Usuario by ID', () => {

    it('Deve buscar o registro a partir do id', {tags: ['@smoke', '@regression']}, () => {
      const usuario = userFactory.valido()
      cy.addUsuario(usuario)
        .then((response) => {
          const id = response.body._id
          cy.getUsuario(id).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.include(usuario)
          })
        })
    })
    it('Deve validar o formato do id esperado', {tags: '@regression'}, () => {

      cy.getUsuario().should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.id).to.eq(MENSAGENS.GERAL.INVALIDO.ID)
      })
    })
  })

  context('POST Usuario', () => {
    const usuario = userFactory.valido()

    it('Realiza cadastro com sucesso - Status 201', {tags: ['@smoke', '@regression']}, () => {
      cy.addUsuario(usuario)
        .validateSchema(schema, {
          endpoint: '/usuarios', method: 'post', status: 201
        })
        .should((response) => {
          expect(response.status).to.eq(201)
          expect(response.body.message).to.eq(MENSAGENS.GERAL.SUCESSO.CADASTRO)
        })
    })

    it('Não deve permitir cadastro com um email inválido - Status 400', {tags: '@regression'}, () => {
      const usuarioInvalido = userFactory.emailInvalido()
      cy.addUsuario(usuarioInvalido).should((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.email).to.eq(MENSAGENS.GERAL.INVALIDO.EMAIL)
      })
    })

    it('Não deve permitir cadastro com e-mail já existente - Status 400', {tags: '@regression'}, () => {
      cy.addUsuario(usuario)
        .validateSchema(schema, {
          endpoint: '/usuarios', method: 'post', status: 400
        })
        .should((response) => {
          const { status, body } = response

          expect(status).to.eq(400)
          expect(body.message).to.eq(MENSAGENS.USUARIO.EMAIL_DUPLICADO)
        })
    })

    it('Não deve permitir cadastro com campos em branco - Status 400', () => {
      const usuario = userFactory.camposEmBranco()

      cy.addUsuario(usuario)
        .should((response) => {
          const { status, body } = response

          expect(status).to.eq(400)
          expect(body.email).to.eq(MENSAGENS.GERAL.EM_BRANCO.EMAIL)
          expect(body.administrador).to.eq(MENSAGENS.USUARIO.INVALIDO.ADMINISTRADOR)
          expect(body.nome).to.eq(MENSAGENS.GERAL.EM_BRANCO.NOME)
          expect(body.password).to.eq(MENSAGENS.GERAL.EM_BRANCO.SENHA)
        })
    })

    it('Valida os campos obrigatórios - Status 400', {tags: '@regression'}, () => {
      const usuario = userFactory.camposAusentes()

      cy.addUsuario(usuario)
        .should((response) => {
          const { status, body } = response

          expect(status).to.eq(400)
          expect(body.email).to.eq(MENSAGENS.GERAL.OBRIGATORIO.EMAIL)
          expect(body.administrador).to.eq(MENSAGENS.GERAL.OBRIGATORIO.ADMINISTRADOR)
          expect(body.nome).to.eq(MENSAGENS.GERAL.OBRIGATORIO.NOME)
          expect(body.password).to.eq(MENSAGENS.GERAL.OBRIGATORIO.SENHA)
        })
    })

  })

  context('DELETE Usuario', () => {

    it('Realiza exclusão com sucesso - Status 200', {tags: ['@smoke', '@regression']}, () => {
      const usuario = userFactory.valido()
      cy.addUsuario(usuario).then((response) => {
        expect(response.status).to.eq(201)
        const id = response.body._id

        cy.deleteUsuario(id)
          .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq(MENSAGENS.GERAL.SUCESSO.EXCLUSAO)
          })
      })
    })

    it('Nenhum registro encontrado - Status 200', {tags: '@regression'}, () => {
      const usuario = userFactory.valido()

      cy.deleteUsuario(usuario)
        .validateSchema(schema, {
          endpoint: '/usuarios/{_id}', method: 'delete', status: 200
        })
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq(MENSAGENS.USUARIO.EXCLUSAO.NAO_ENCONTRADO)
        })
    })

  })
})