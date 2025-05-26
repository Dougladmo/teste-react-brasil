
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

// Configurações para maximizar a janela do browser durante os testes
Cypress.on('before:browser:launch', (browser = {}, launchOptions) => {
  console.log('Configurando browser:', browser.name, browser.family)
  
  // Para Chrome/Chromium
  if (browser.family === 'chromium' && browser.name !== 'electron') {
    // Maximizar a janela
    launchOptions.args.push('--start-maximized')
    // Definir tamanho específico da janela (1920x1080)
    launchOptions.args.push('--window-size=1920,1080')
    // Posicionar a janela no canto superior esquerdo
    launchOptions.args.push('--window-position=0,0')
    // Remover algumas limitações para melhor visualização
    launchOptions.args.push('--disable-web-security')
    launchOptions.args.push('--disable-features=VizDisplayCompositor')
    console.log('Chrome configurado para tela maximizada')
  }

  // Para Firefox
  if (browser.name === 'firefox') {
    launchOptions.args.push('--width=1920')
    launchOptions.args.push('--height=1080')
    console.log('Firefox configurado para tela grande')
  }

  // Para Electron (interface do Cypress)
  if (browser.name === 'electron') {
    launchOptions.preferences = launchOptions.preferences || {}
    launchOptions.preferences.width = 1920
    launchOptions.preferences.height = 1080
    launchOptions.preferences.x = 0
    launchOptions.preferences.y = 0
    launchOptions.preferences.maximized = true
    console.log('Electron configurado para tela maximizada')
  }

  return launchOptions
})
