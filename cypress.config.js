const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  screenshotOnRunFailure: true,
  video: false,

  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    charts: true,
    reportPageTitle: "QAuto E2E Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },
  },
});