describe('API Login - ServerRest', () => {
  
    it('Deve autenticar com credenciais válidas', () => {
        const { email, password } = Cypress.env("user")
        
        cy.request({
        method: 'POST',
        url: `${Cypress.env("apiUrl")}/login`,
        body: {
          email: email, // Usuário padrão do ServerRest
          password: password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('authorization').and.not.be.empty;
        expect(response.body.message).to.eq('Login realizado com sucesso');
      });
    });
  
    it('Deve retornar erro com credenciais inválidas', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env("apiUrl")}/login`,
        body: {
          email: 'invalido@qa.com',
          password: 'senhaerrada'
        },
        failOnStatusCode: false // Permite status 4xx/5xx sem falhar o teste
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq('Email e/ou senha inválidos');
      });
    });
  });