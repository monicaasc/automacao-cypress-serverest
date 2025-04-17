export const MENSAGENS = {
  GERAL: {
    OBRIGATORIO: {
      EMAIL: 'email é obrigatório',
      SENHA: 'password é obrigatório',
      ADMINISTRADOR: 'administrador é obrigatório',
      NOME: 'nome é obrigatório'
    },
    INVALIDO: {
      EMAIL: 'email deve ser um email válido',
      ID: 'id deve ter exatamente 16 caracteres alfanuméricos'
    },
    SUCESSO: {
      CADASTRO: 'Cadastro realizado com sucesso',
      EXCLUSAO: 'Registro excluído com sucesso'
    },
    EM_BRANCO: {
      NOME: 'nome não pode ficar em branco',
      EMAIL: 'email não pode ficar em branco',
      SENHA: 'password não pode ficar em branco'
    },
  },
  LOGIN: {
    SUCESSO: 'Login realizado com sucesso',
    CREDENCIAIS_INVALIDAS: 'Email e/ou senha inválidos'
  },
  USUARIO: {
    EMAIL_DUPLICADO: 'Este email já está sendo usado',
    INVALIDO: {
      ADMINISTRADOR: 'administrador deve ser \'true\' ou \'false\''
    },
    EXCLUSAO: {
      NAO_ENCONTRADO: 'Nenhum registro excluído',
    }
  },
}