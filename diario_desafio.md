# 📅 Diário do Desafio

Este diário tem como objetivo apresentar as decisões técnicas, práticas adotadas e oportunidades de melhoria identificadas durante o desenvolvimento de um projeto de automação de testes.


## ✨ Início da jornada

Antes de colocar a mão na massa, foi essencial refletir sobre a estrutura e as escolhas técnicas:

- **Configurações iniciais:**

  - Estrutura do projeto (pastas, arquivos iniciais)
  - Variáveis de ambiente com `Cypress.env()` e `.env`
  - Criação do `README.md` explicando a execução e dependências
  - Criação de `.gitignore` para evitar subir arquivos desnecessários

- **Possibilidades consideradas:**

  - Configuração do **GitHub Actions** para CI/CD
  - Uso do **gitflow** como fluxo de trabalho
  - Escrita de mensagens de commit com **Conventional Commits**

---

## 🔨 Boas práticas adotadas

- **Análise estática com ESLint**

  - Inclusão do plugin `eslint-plugin-cypress`
  - Regras configuradas via `.eslintrc.json`

- **Acessibilidade e confiabilidade nos testes**

  - Uso de `data-testid` sempre que possível
  - Regra personalizada de lint que emite warning quando data-* genérico é utilizado, incentivando o uso de data-*

- **Git e Gitflow**

  - Uso do `gitignore`
  - Branches padronizadas (main, develop, feature/...)
  - Commits com convenção (feat, fix, chore...)
  - **Husky** com hooks de lint/pre-commit/pre-push
  - Validação com `commitlint`

- **Validação de contrato**

  - Utilização do plugin `cypress-ajv-schema-validator`
  - Schemas definidos com base na documentação Swagger

- **Testes atômicos e bem estruturados**

  - Testes pequenos e objetivos
  - Separação entre testes de serviço (API) e de interface (UI)

- **Uso do Faker**

  - Geração de dados dinâmicos e aleatórios

- **Evitar valores mágicos**

  - Centralização de mensagens em um arquivo `mensagens.js`

- **Distribuição de testes**

  - Foco no teste de serviço, considerando seu custo em relação ao de UI

  **Pipeline de CI configurada com sucesso** - [![Pipeline](https://github.com/monicaasc/desafio-ambev/actions/workflows/pipeline.yml/badge.svg?branch=develop)](https://github.com/monicaasc/desafio-ambev/actions/workflows/pipeline.yml)
  - A integração com o GitHub Actions foi ajustada e está funcional, executando automaticamente os testes a cada push ou pull request nas branches `main` e `develop`.
  Esse fluxo garante feedback rápido sobre possíveis quebras, aumentando a confiabilidade e agilidade nas entregas.
  - Utilização de secrets do GitHub para garantir a segurança das configurações.



### 🛠️ Design Patterns aplicados

- **Custom Commands (Cypress.Commands)**

  - Reaproveitamento de chamadas para login, criação de usuário, etc.


- **Factory Pattern**

  - Geração de dados de entrada centralizados
  - Uso conjunto com o `faker`

---

## 🔍 O que pode ser melhorado...

- Integração com relatórios (como Mochawesome, Allure) para melhor visibilidade dos resultados.
- Ajustar pipeline no **GitHub Actions** para corrigir execução.
- Considerei a inclusão de **teste de regressão visual** com `cypress-image-snapshot`, mas foi necessário despriorizar esse item para outro momento.
- "Tempo é dinheiro!" — conforme a suite vai crescendo é necessário avaliar estratégias de limitar execução ou rodar testes específicos. O uso do cypress-grep poderia ajudar.
  - Uso do `cypress-grep` para filtragem por tags como `@smoke`, `@regression`.
- Priorização dos testes de API pela afinidade, mas com consciência do potencial de testes UI ainda a serem explorados.
- Decisão consciente de evitar BDD/Gherkin para não aumentar complexidade sem necessidade real.
- O desafio foi **instigante** e me deixou animada para continuar desenvolvendo e evoluindo a solução 🚀

---

Agradeço pela oportunidade de participar desse desafio. Estou motivada a continuar evoluindo a solução e aberta a feedbacks que possam levar o projeto ainda mais longe 😊