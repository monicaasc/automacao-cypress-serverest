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

### 🎯 Execução filtrada por tags

Este projeto utiliza o plugin [`@cypress/grep`](https://www.npmjs.com/package/@cypress/grep) para permitir a execução seletiva de testes com base em **tags** configuradas, como por exemplo, `@smoke` e `@regression`.

#### 📌 Exemplos de execução com filtro

```bash
# Executa apenas os testes marcados com a tag @smoke
npx cypress run --env grepTags=@smoke

# Executa apenas os testes marcados com a tag @regression
npx cypress run --env grepTags=@regression
```

#### ✅ Convenção adotada

- `@smoke` → Testes principais e de fluxo feliz  
- `@regression` → Conjunto completo incluindo testes negativos


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