const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  screenshotOnRunFailure: true,
  video: false,

  e2e: {
    baseUrl: "https://qauto.forstudy.space",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});