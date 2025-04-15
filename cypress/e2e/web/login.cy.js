describe('Frontend Login - ServerRest', () => {
  const { email, password } = Cypress.env("user")

  beforeEach(() => {
    cy.visit("/login");
  });

  it('Deve logar com sucesso e redirecionar para a home', () => {
    // Preenche formulário
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="senha"]').type(password);
    cy.get('[data-testid="entrar"]').click();

    // Validações pós-login
    cy.url().should('eq', `${Cypress.env("baseUrl")}/admin/home`);
    cy.get('[data-testid="logout"]').should('be.visible');
  });

  it('Deve exibir erro com credenciais inválidas', () => {
    cy.get('[data-testid="email"]').type("invalido@qa.com");
    cy.get('[data-testid="senha"]').type("senhaerrada");
    cy.get('[data-testid="entrar"]').click();

    cy.get('.alert').should('contain', 'Email e/ou senha inválidos');
  });
});