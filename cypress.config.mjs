
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081',
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // Configurações de viewport e tela
    viewportWidth: 1920,
    viewportHeight: 1080,
    // Configurações de performance e debugging
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    // Configurações de vídeo e screenshot
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    // Configurações do browser
    chromeWebSecurity: false,
    // Configurações para testes mais lentos e visíveis
    animationDistanceThreshold: 20,
    waitForAnimations: true,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  // Configurações globais do Cypress Test Runner
  env: {
    // Configurações personalizadas
  },
  // Configurações para o Test Runner (interface do Cypress)
  experimentalStudio: true,
})
