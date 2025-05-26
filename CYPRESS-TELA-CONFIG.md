# Configurações de Tela do Cypress

Este projeto foi configurado para abrir o Cypress com uma tela maior (1920x1080) para melhor visualização dos testes.

## Comandos Disponíveis

### Para Abrir o Cypress Test Runner

```bash
# Comando padrão - abre com tela grande (1920x1080)
npm run cypress:open

# Comando para tela completa com Chrome específico
npm run cypress:open:fullscreen

# Comando para debugging com configurações otimizadas
npm run test:e2e:debug
```

### Para Executar Testes

```bash
# Executa todos os testes com tela grande
npm run cypress:run

# Executa com Chrome específico e tela grande
npm run cypress:run:chrome

# Executa testes headless (sem interface) com tela grande
npm run cypress:run:headless

# Executa testes com aplicação rodando (modo completo)
npm run test:e2e

# Executa com interface aberta e aplicação rodando
npm run test:e2e:headed
```

## Configurações Aplicadas

### 1. Viewport Configuration
- **Width**: 1920px
- **Height**: 1080px
- **Position**: Top-left corner (0,0)

### 2. Browser Launch Options
- **Chrome/Chromium**: `--start-maximized`, `--window-size=1920,1080`
- **Firefox**: `--width=1920`, `--height=1080`
- **Electron**: Configurações de preferência para maximizar

### 3. Performance Settings
- **Command Timeout**: 10 segundos
- **Page Load Timeout**: 30 segundos
- **Request/Response Timeout**: 10 segundos
- **Video Recording**: Ativado com compressão 32
- **Screenshots**: Ativados em caso de falha

## Arquivos Modificados

1. **cypress.config.mjs**: Configurações principais do Cypress
2. **cypress/support/e2e.ts**: Configurações de browser launch
3. **package.json**: Scripts com configurações de viewport

## Uso Recomendado

Para melhor experiência durante desenvolvimento e debugging:

```bash
# Inicie a aplicação
npm run dev

# Em outro terminal, abra o Cypress com tela maximizada
npm run cypress:open:fullscreen
```

Para execução de testes automatizada:

```bash
# Executa testes com aplicação (tudo junto)
npm run test:e2e:headed
```

## Troubleshooting

Se a tela ainda não estiver grande o suficiente:

1. Verifique se o monitor suporta resolução 1920x1080
2. Ajuste manualmente a janela do Cypress após abrir
3. Use o comando `cypress:open:fullscreen` que força o Chrome a maximizar

## Configurações Personalizadas

Você pode modificar as dimensões editando os arquivos:
- `cypress.config.mjs`: Para configurações globais
- `cypress/support/e2e.ts`: Para configurações de browser
- `package.json`: Para scripts personalizados
