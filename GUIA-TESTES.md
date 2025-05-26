
# Guia Completo de Testes - Garimpo E-commerce

Este guia fornece instruções passo a passo para executar todos os tipos de testes implementados no projeto Garimpo.

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Configuração Inicial](#configuração-inicial)
3. [Testes Funcionais](#testes-funcionais)
4. [Testes de Performance](#testes-de-performance)
5. [Testes de Segurança](#testes-de-segurança)
6. [Testes de Acessibilidade](#testes-de-acessibilidade)
7. [Testes de Integração](#testes-de-integração)
8. [Comandos Personalizados](#comandos-personalizados)
9. [Relatórios](#relatórios)
10. [Troubleshooting](#troubleshooting)

## 🔧 Pré-requisitos

Antes de executar os testes, certifique-se de ter:

- Node.js versão 16 ou superior
- NPM ou Yarn instalado
- Aplicação rodando localmente na porta 8080
- Cypress instalado como dependência de desenvolvimento

```bash
npm install cypress --save-dev
```

## ⚙️ Configuração Inicial

### 1. Configurar Variáveis de Ambiente

Certifique-se de que sua aplicação está rodando em `http://localhost:8080`. Se estiver usando uma porta diferente, atualize o arquivo `cypress.config.ts`:

```typescript
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:SUA_PORTA',
    // ... outras configurações
  }
})
```

### 2. Iniciar a Aplicação

```bash
# Terminal 1 - Iniciar a aplicação
npm run dev
```

### 3. Abrir o Cypress

```bash
# Terminal 2 - Abrir interface do Cypress
npx cypress open

# OU executar testes em modo headless
npx cypress run
```

## 🧪 Testes Funcionais

### TC01 - Login Válido

**Objetivo**: Verificar se o login funciona corretamente com credenciais válidas.

**Como executar**:
```bash
npx cypress run --spec "cypress/e2e/tc01-login-valido.cy.ts"
```

**Cenários testados**:
- Login com credenciais válidas
- Redirecionamento para página de produtos
- Validação de credenciais inválidas

**Dados de teste**:
- Email válido: `standard_user@teste.com`
- Senha válida: `secret_sauce`

### TC02 - Logout

**Objetivo**: Verificar se o logout funciona corretamente.

**Como executar**:
```bash
npx cypress run --spec "cypress/e2e/tc02-logout.cy.ts"
```

**Cenários testados**:
- Logout após login válido
- Redirecionamento para tela de login
- Limpeza de dados do usuário

### TC03 - Checkout Completo

**Objetivo**: Testar o fluxo completo de compra.

**Como executar**:
```bash
npx cypress run --spec "cypress/e2e/tc03-checkout-completo.cy.ts"
```

**Cenários testados**:
- Adicionar produto ao carrinho
- Preencher dados de entrega
- Selecionar forma de pagamento
- Finalizar compra
- Validação de campos obrigatórios

### TC04 - Ordenação de Lista

**Objetivo**: Verificar se a ordenação de produtos funciona corretamente.

**Como executar**:
```bash
npx cypress run --spec "cypress/e2e/tc04-ordenacao-lista.cy.ts"
```

**Cenários testados**:
- Ordenação por menor preço
- Ordenação por maior preço
- Ordenação por nome (alfabética)

### TC05 - Remoção do Carrinho

**Objetivo**: Testar funcionalidades de manipulação do carrinho.

**Como executar**:
```bash
npx cypress run --spec "cypress/e2e/tc05-remocao-carrinho.cy.ts"
```

**Cenários testados**:
- Remover produto do carrinho
- Atualizar quantidades
- Remover múltiplos produtos

## ⚡ Testes de Performance

**Objetivo**: Medir tempos de resposta e verificar performance da aplicação.

**Como executar**:
```bash
npx cypress run --spec "cypress/e2e/performance.cy.ts"
```

**Métricas verificadas**:
- Tempo de carregamento da página inicial (< 3 segundos)
- Tempo de carregamento após login (< 2 segundos)
- Tempo de resposta ao filtrar produtos (< 1 segundo)

**Interpretando os resultados**:
- ✅ Verde: Tempo dentro do limite esperado
- ⚠️ Amarelo: Tempo próximo ao limite
- ❌ Vermelho: Tempo acima do limite aceitável

## 🔒 Testes de Segurança

**Objetivo**: Verificar vulnerabilidades básicas de segurança.

**Como executar**:
```bash
npx cypress run --spec "cypress/e2e/seguranca.cy.ts"
```

**Cenários testados**:
- Prevenção de XSS (Cross-Site Scripting)
- Proteção de rotas autenticadas
- Validação de campos obrigatórios
- Sanitização de dados de entrada

**Scripts maliciosos testados**:
```javascript
'<script>alert("XSS")</script>'
'<script>document.location="http://malicious-site.com"</script>'
```

## ♿ Testes de Acessibilidade

**Objetivo**: Verificar se a aplicação atende padrões de acessibilidade.

**Como executar**:
```bash
npx cypress run --spec "cypress/e2e/acessibilidade.cy.ts"
```

**Verificações realizadas**:
- Estrutura semântica (header, main, nav)
- Navegação por teclado (Tab)
- Labels em campos de formulário
- Contraste de cores
- Responsividade em diferentes tamanhos de tela

**Tamanhos de tela testados**:
- Mobile: 375x667
- Tablet: 768x1024
- Desktop: 1920x1080

## 🔄 Testes de Integração

**Objetivo**: Testar o fluxo completo da aplicação.

**Como executar**:
```bash
npx cypress run --spec "cypress/e2e/integracao-completa.cy.ts"
```

**Fluxo testado**:
1. Login → 2. Navegação → 3. Filtros → 4. Carrinho → 5. Checkout → 6. Logout

## 🛠️ Comandos Personalizados

O projeto possui comandos personalizados do Cypress para facilitar os testes:

```javascript
// Login rápido
cy.login('email@teste.com', 'senha')

// Logout
cy.logout()

// Adicionar produto ao carrinho
cy.adicionarProdutoAoCarrinho()

// Abrir carrinho
cy.abrirCarrinho()

// Verificações customizadas
cy.shouldBeVisible('[data-cy="elemento"]')
cy.shouldContain('[data-cy="elemento"]', 'texto')
```

## 📊 Relatórios

### Executar todos os testes e gerar relatório

```bash
# Executar todos os testes
npx cypress run

# Executar testes específicos
npx cypress run --spec "cypress/e2e/tc*.cy.ts"

# Executar com gravação de vídeo
npx cypress run --record --key YOUR_RECORD_KEY
```

### Interpretar resultados

- **✅ Passed**: Teste passou com sucesso
- **❌ Failed**: Teste falhou - verificar logs de erro
- **⏭️ Skipped**: Teste foi pulado

### Arquivos de resultado

- Videos: `cypress/videos/`
- Screenshots: `cypress/screenshots/`
- Relatórios: Console do terminal

## 🔧 Troubleshooting

### Problemas Comuns

**1. Aplicação não está rodando**
```bash
# Erro: "cy.visit() failed trying to load"
# Solução: Verificar se a aplicação está rodando na porta correta
npm run dev
```

**2. Elementos não encontrados**
```bash
# Erro: "Timed out retrying after 4000ms"
# Solução: Verificar se os data-cy attributes existem no código
```

**3. Testes lentos**
```bash
# Solução: Executar em modo headless
npx cypress run
```

**4. Falha na autenticação**
```bash
# Verificar se as credenciais de teste estão corretas:
# Email: standard_user@teste.com
# Senha: secret_sauce
```

### Logs e Debug

Para ver logs detalhados:
```bash
# Debug mode
DEBUG=cypress:* npx cypress run

# Apenas logs do Cypress
DEBUG=cypress:cli npx cypress run
```

### Configurações de Viewport

Para testar em diferentes resoluções:
```javascript
// No teste
cy.viewport(1280, 720) // Desktop
cy.viewport(768, 1024) // Tablet
cy.viewport(375, 667)  // Mobile
```

## 📝 Boas Práticas

1. **Sempre use data-cy attributes** para seletores estáveis
2. **Execute testes em ambiente limpo** (clear cookies/storage)
3. **Mantenha dados de teste consistentes**
4. **Execute testes regularmente** durante o desenvolvimento
5. **Documente novos cenários** de teste

## 🚀 Executando em CI/CD

Para integração contínua, use:

```yaml
# .github/workflows/cypress.yml
name: Cypress Tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Cypress run
        uses: cypress-io/github-action@v2
        with:
          start: npm start
          wait-on: 'http://localhost:8080'
```

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no console
2. Consulte a documentação do Cypress
3. Verifique se todos os data-cy attributes estão implementados
4. Execute um teste isolado para debug

**Documentação oficial**: https://docs.cypress.io/
