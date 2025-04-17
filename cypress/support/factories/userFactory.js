import { faker } from '@faker-js/faker'

export const userFactory = {
  valido(admin = faker.datatype.boolean()) {
    return {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: admin.toString()
    }
  },

  emailInvalido() {
    return {
      nome: faker.person.fullName(),
      email: faker.lorem.word(), // sem formato de email
      password: faker.internet.password(),
      administrador: 'true'
    }
  },

  camposEmBranco() {
    return {
      nome: '',
      email: '',
      password: '',
      administrador: ''
    }
  },

  camposAusentes() {
    return {}
  }
}