const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Carrega as variáveis do ambiente selecionado (ex: --env env=production)
      const env = config.env.env || "dev";
      const configFile = require(`./cypress/configs/${env}.json`);
      
      // Mescla as configurações do ambiente com as do Cypress
      config.baseUrl = configFile.baseUrl;
      config.env = {
        ...config.env,
        ...configFile
      };
      
      return config;
    },
  },
});
