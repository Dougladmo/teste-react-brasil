# Guia Completo de Comandos Cypress

## 📋 Resumo dos Comandos Criados

Este documento lista todos os comandos customizados do Cypress criados para facilitar os testes da aplicação.

## 🔐 Comandos de Autenticação

### `cy.login(email?, password?)`
Realiza login na aplicação.
- **Parâmetros opcionais**: Se não informados, usa `teste@teste.com` e `123456`
- **Exemplo**: 
  ```javascript
  cy.login() // Usa credenciais padrão
  cy.login('usuario@teste.com', 'minhasenha')
  ```

### `cy.logout()`
Realiza logout da aplicação.
- **Exemplo**: 
  ```javascript
  cy.logout()
  ```

### `cy.registerUser(name, email, password, confirmPassword)`
Registra um novo usuário.
- **Exemplo**: 
  ```javascript
  cy.registerUser('teste', 'novo@teste.com', '123456', '123456')
  ```

## 🛍️ Comandos de Navegação e Filtros

### `cy.selectCategory(category)`
Seleciona uma categoria de produtos.
- **Categorias**: 'Roupas', 'Eletrônicos', 'Livros', 'Todos'
- **Exemplo**: 
  ```javascript
  cy.selectCategory('Roupas')
  ```

### `cy.applyFilter(filterType, searchTerm?)`
Aplica filtros aos produtos.
- **Tipos**: 'name', 'lowest-price', 'highest-price'
- **Exemplo**: 
  ```javascript
  cy.applyFilter('name', 'camisa')
  cy.applyFilter('lowest-price')
  ```

## 🛒 Comandos do Carrinho

### `cy.addToCart(productId?)`
Adiciona produto ao carrinho.
- **Exemplo**: 
  ```javascript
  cy.addToCart() // Adiciona primeiro produto disponível
  cy.addToCart('product-1') // Adiciona produto específico
  ```

### `cy.openCart()`
Abre o sidebar do carrinho.
- **Exemplo**: 
  ```javascript
  cy.openCart()
  ```

### `cy.removeFromCart(productId)`
Remove item específico do carrinho.
- **Exemplo**: 
  ```javascript
  cy.removeFromCart('product-1')
  ```

### `cy.clearCart()`
Limpa todo o carrinho.
- **Exemplo**: 
  ```javascript
  cy.clearCart()
  ```

## 💳 Comandos de Checkout

### `cy.proceedToCheckout()`
Vai para a tela de checkout.
- **Exemplo**: 
  ```javascript
  cy.proceedToCheckout()
  ```

### `cy.completeCheckout(name, cep, address, paymentMethod)`
Completa o processo de checkout.
- **Métodos de pagamento**: 'cartao', 'pix', 'boleto'
- **Exemplo**: 
  ```javascript
  cy.completeCheckout('João Silva', '01310-100', 'Rua A, 123', 'cartao')
  ```

## 🔔 Comandos Utilitários

### `cy.waitForToast(message?)`
Aguarda toast de notificação aparecer.
- **Exemplo**: 
  ```javascript
  cy.waitForToast('Produto adicionado ao carrinho')
  cy.waitForToast() // Aguarda qualquer toast
  ```

## 📝 Suíte de Testes Criada

### TC00 - Setup Conta Padrão
Cria e testa a conta padrão `teste@teste.com`.

### TC01 - Login Válido
Testa login com credenciais válidas e inválidas.

### TC02 - Registro de Usuário
Testa criação de novos usuários e validações.

### TC03 - Logout
Testa funcionalidade de logout e limpeza de dados.

### TC04 - Seleção de Categorias
Testa filtros por categoria de produtos.

### TC05 - Filtros de Produtos
Testa busca por nome e ordenação por preço.

### TC06 - Funcionalidades do Carrinho
Testa adicionar, remover e gerenciar itens no carrinho.

### TC07 - Checkout Completo
Testa todo o processo de finalização de compra.

### TC08 - Fluxo Completo do Usuário
Testa jornada completa do usuário do registro ao checkout.

## 🚀 Como Executar os Testes

### Executar todos os testes:
```bash
npx cypress run
```

### Executar teste específico:
```bash
npx cypress run --spec "cypress/e2e/tc01-login-valido.cy.ts"
```

### Abrir interface do Cypress:
```bash
npx cypress open
```

### Executar em modo headless:
```bash
npx cypress run --headless
```

## 📊 Credenciais Padrão

- **Email**: teste@teste.com
- **Usuário**: teste  
- **Senha**: 123456

## 🎯 Data-cy Attributes Necessários

Para que os testes funcionem, os seguintes `data-cy` attributes devem estar presentes nos componentes:

### Autenticação:
- `[data-cy="login-form"]`
- `[data-cy="login-email"]`
- `[data-cy="login-password"]`
- `[data-cy="login-submit"]`
- `[data-cy="toggle-to-register"]`
- `[data-cy="register-form"]`
- `[data-cy="register-name"]`
- `[data-cy="register-email"]`
- `[data-cy="register-password"]`
- `[data-cy="register-confirm-password"]`
- `[data-cy="register-submit"]`
- `[data-cy="logout-button"]`
- `[data-cy="user-name"]`

### Produtos:
- `[data-cy="lista-produtos"]`
- `[data-cy="product-card"]`
- `[data-cy="product-name"]`
- `[data-cy="product-price"]`
- `[data-cy="product-category"]`
- `[data-cy="product-image"]`
- `[data-cy="categoria-filter"]`
- `[data-cy="search-input"]`
- `[data-cy="search-button"]`
- `[data-cy="sort-filter"]`
- `[data-cy="clear-filters"]`

### Carrinho:
- `[data-cy="cart-button"]`
- `[data-cy="cart-count"]`
- `[data-cy="cart-sidebar"]`
- `[data-cy="cart-items"]`
- `[data-cy="cart-item"]`
- `[data-cy="cart-total"]`
- `[data-cy="empty-cart"]`
- `[data-cy="checkout-button"]`
- `[data-cy="close-cart"]`
- `[data-cy^="add-to-cart-"]`
- `[data-cy^="remove-from-cart-"]`
- `[data-cy="clear-cart-button"]`

### Checkout:
- `[data-cy="checkout-form"]`
- `[data-cy="checkout-name"]`
- `[data-cy="checkout-cep"]`
- `[data-cy="checkout-address"]`
- `[data-cy="payment-cartao"]`
- `[data-cy="payment-pix"]`
- `[data-cy="payment-boleto"]`
- `[data-cy="finalize-order"]`
- `[data-cy="order-confirmation"]`
- `[data-cy="order-number"]`

## 💡 Dicas de Uso

1. **Sempre execute TC00 primeiro** para garantir que a conta padrão existe
2. **Use comandos customizados** para manter testes limpos e reutilizáveis
3. **Aguarde toasts** para confirmar ações foram realizadas
4. **Limpe estado** entre testes quando necessário
5. **Use seletores data-cy** consistentes para estabilidade dos testes
