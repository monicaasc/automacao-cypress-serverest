import { faker } from '@faker-js/faker'


export const loginFactory = {
  // Credenciais válidas
  valido() {
    const defaultUser = Cypress.env('user')

    return {
      email: defaultUser.email,
      password: defaultUser.password
    }
  },

  invalido() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  },

  emailInvalido() {
    return {
      email: faker.lorem.word(), // gera algo sem o formato esperado
      password: faker.internet.password()
    }
  },

  senhaEmBranco() {
    return {
      email: faker.internet.email(),
      password: ''
    }
  },

  camposEmBranco() {
    return {
      email: '',
      password: ''
    }
  },

  camposAusentes() {
    return {}
  }

}
