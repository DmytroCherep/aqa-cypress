const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
  ...baseConfig,

  env: {
    userEmail: "dmytro.qauto2.211.20261015@gmail.com",
    userPassword: "Test12345",
  },

  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://qauto2.forstudy.space",
  },
});