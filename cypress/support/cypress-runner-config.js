// Configurações para maximizar a janela do Cypress Test Runner
// Este arquivo pode ser usado para personalizar ainda mais o comportamento

// Configurações específicas para quando o Cypress abre
Cypress.on('before:browser:launch', (browser = {}, launchOptions) => {
  // Para Chrome/Chromium/Electron
  if (browser.family === 'chromium' && browser.name !== 'electron') {
    // Maximizar a janela
    launchOptions.args.push('--start-maximized')
    // Definir tamanho específico da janela
    launchOptions.args.push('--window-size=1920,1080')
    // Posicionar a janela
    launchOptions.args.push('--window-position=0,0')
    // Remover barras e interface do browser para mais espaço
    launchOptions.args.push('--disable-web-security')
    launchOptions.args.push('--disable-features=VizDisplayCompositor')
  }

  // Para Firefox
  if (browser.name === 'firefox') {
    launchOptions.args.push('--width=1920')
    launchOptions.args.push('--height=1080')
  }

  // Para Electron (App do Cypress)
  if (browser.name === 'electron') {
    launchOptions.preferences.width = 1920
    launchOptions.preferences.height = 1080
    launchOptions.preferences.x = 0
    launchOptions.preferences.y = 0
    launchOptions.preferences.fullscreen = false
    launchOptions.preferences.maximized = true
  }

  return launchOptions
})

// Configurações adicionais para melhor visualização
Cypress.config('viewportWidth', 1920)
Cypress.config('viewportHeight', 1080)
