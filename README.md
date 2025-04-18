# Desafio Cypress

Este projeto utiliza o [Cypress](https://www.cypress.io/) para realizar testes automatizados de *API* e *WEB*.

---

## 🚀 Funcionalidades

- *Testes de API*: Valida endpoints, status codes, schemas de resposta e comportamentos esperados.
- *Testes Web*: Simula interações de usuário em uma aplicação web.

---

## 📋 Pré-requisitos

- Node.js
- npm ou yarn

## 🧪 Execução dos Testes

```bash
# Modo interativo (abre a interface gráfica)
npx cypress open
```

### Testes UI
```bash
# Modo headless (execução em terminal)
npm run test:web
```

### *Testes de API*
```bash
# Modo headless (execução em terminal)
npm run test:api
```

---

## 📂Estrutura de Pastas
```
cypress/
├── e2e/
│   ├── web/          # Testes de interface
│   └── api/          # Testes de API
├── fixtures/         # Dados mockados
├── support/          # Funções reutilizáveis
│   └── commands.js   # Comandos customizados
└── configs/          # Configurações por ambiente
    ├── dev.json      # Variáveis para desenvolvimento - Necessário configurar
    └── example.json
```