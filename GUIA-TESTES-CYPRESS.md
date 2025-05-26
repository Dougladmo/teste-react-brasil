# 🧪 Guia Completo de Testes Cypress - E-commerce

## 📋 Visão Geral

Este projeto contém uma suíte completa de testes automatizados usando Cypress para testar todas as funcionalidades de um e-commerce, desde o registro de usuário até o checkout completo.

## 🛠️ Comandos Customizados Criados

### Autenticação
- `cy.login(email, password)` - Realiza login com credenciais
- `cy.logout()` - Realiza logout do usuário
- `cy.registerUser(name, email, password, confirmPassword)` - Registra novo usuário

### Navegação e Filtros
- `cy.selectCategory(category)` - Seleciona categoria ('Roupas', 'Eletrônicos', 'Livros', 'Todos')
- `cy.applyFilter(filterType, searchTerm?)` - Aplica filtros ('name', 'lowest-price', 'highest-price')

### Carrinho
- `cy.addToCart(productId?)` - Adiciona produto ao carrinho
- `cy.openCart()` - Abre sidebar do carrinho
- `cy.removeFromCart(productId)` - Remove item específico do carrinho
- `cy.clearCart()` - Limpa todo o carrinho

### Checkout
- `cy.proceedToCheckout()` - Vai para página de checkout
- `cy.completeCheckout(name, cep, address, paymentMethod)` - Completa processo de compra

### Utilitários
- `cy.waitForToast(message?)` - Aguarda notificação toast aparecer

## 📁 Estrutura dos Testes

### TC01 - Login Válido (`tc01-login-valido.cy.ts`)
- ✅ Login com credenciais válidas
- ✅ Verificação de erros com credenciais inválidas
- ✅ Redirecionamento correto após login

### TC02 - Registro de Usuário (`tc02-registro-usuario.cy.ts`)
- ✅ Registro de novo usuário com sucesso
- ✅ Validação de senhas não coincidentes
- ✅ Verificação de email já existente
- ✅ Validação de campos obrigatórios
- ✅ Redirecionamento para login após registro

### TC03 - Logout (`tc03-logout.cy.ts`)
- ✅ Logout com redirecionamento para login
- ✅ Limpeza de dados do usuário após logout
- ✅ Proteção de rotas após logout
- ✅ Visibilidade do botão de logout

### TC04 - Seleção de Categorias (`tc04-selecao-categorias.cy.ts`)
- ✅ Filtro por categoria Roupas
- ✅ Filtro por categoria Eletrônicos
- ✅ Filtro por categoria Livros
- ✅ Exibição de todos os produtos
- ✅ Manutenção de filtro durante navegação
- ✅ Combinação de filtros

### TC05 - Filtros de Produtos (`tc05-filtros-produtos.cy.ts`)
- ✅ Busca por nome/texto
- ✅ Ordenação por menor preço
- ✅ Ordenação por maior preço
- ✅ Combinação de filtros de categoria e ordenação
- ✅ Combinação de busca com categoria
- ✅ Mensagem para nenhum produto encontrado
- ✅ Limpeza de filtros
- ✅ Manutenção de filtros após ações

### TC06 - Carrinho Funcionalidades (`tc06-carrinho-funcionalidades.cy.ts`)
- ✅ Adicionar produto ao carrinho
- ✅ Adicionar múltiplos produtos
- ✅ Verificar informações corretas do produto
- ✅ Cálculo correto do total
- ✅ Remoção de produto específico
- ✅ Limpeza completa do carrinho
- ✅ Alteração de quantidade
- ✅ Manutenção do carrinho durante navegação
- ✅ Funcionalidade de abrir/fechar sidebar
- ✅ Prevenção de duplicação de produtos

### TC07 - Checkout Completo (`tc07-checkout-completo.cy.ts`)
- ✅ Checkout com cartão de crédito
- ✅ Checkout com PIX
- ✅ Checkout com boleto
- ✅ Validação de campos obrigatórios
- ✅ Cálculo de frete por CEP
- ✅ Resumo do pedido
- ✅ Edição do carrinho durante checkout
- ✅ Validação de formato do CEP
- ✅ Aplicação de desconto
- ✅ Opções de parcelamento
- ✅ Salvamento de endereço

### TC08 - Fluxo Completo do Usuário (`tc08-fluxo-completo-usuario.cy.ts`)
- ✅ Jornada completa: registro → login → navegação → compra → logout
- ✅ Teste com diferentes métodos de pagamento
- ✅ Teste com carrinho complexo
- ✅ Cenários de erro e recuperação

## 🚀 Como Executar os Testes

### Executar Todos os Testes
```bash
npx cypress run
```

### Executar Interface Gráfica
```bash
npx cypress open
```

### Executar Teste Específico
```bash
npx cypress run --spec "cypress/e2e/tc01-login-valido.cy.ts"
```

### Executar Suíte Completa
```bash
npx cypress run --spec "cypress/e2e/suite-completa.cy.ts"
```

## 📊 Cenários de Teste Cobertos

### 🔐 Autenticação (3 arquivos)
- Login válido e inválido
- Registro de usuário
- Logout e segurança de sessão

### 🛍️ Produtos e Navegação (2 arquivos)
- Filtragem por categorias
- Busca e ordenação
- Combinação de filtros

### 🛒 Carrinho (1 arquivo)
- Adicionar/remover produtos
- Cálculo de totais
- Gerenciamento de quantidades

### 💳 Checkout (1 arquivo)
- Processo completo de compra
- Múltiplos métodos de pagamento
- Validações e cálculos

### 🎯 Integração (1 arquivo)
- Fluxos completos end-to-end
- Cenários complexos
- Testes de smoke

## 🎯 Data-cy Attributes Utilizados

### Autenticação
- `[data-cy="login-form"]`
- `[data-cy="login-email"]`
- `[data-cy="login-password"]`
- `[data-cy="login-submit"]`
- `[data-cy="register-form"]`
- `[data-cy="register-name"]`
- `[data-cy="register-email"]`
- `[data-cy="register-password"]`
- `[data-cy="register-confirm-password"]`
- `[data-cy="register-submit"]`
- `[data-cy="logout-button"]`

### Produtos
- `[data-cy="lista-produtos"]`
- `[data-cy="product-card"]`
- `[data-cy="product-name"]`
- `[data-cy="product-price"]`
- `[data-cy="product-category"]`
- `[data-cy="product-image"]`

### Filtros
- `[data-cy="categoria-filter"]`
- `[data-cy="search-input"]`
- `[data-cy="search-button"]`
- `[data-cy="sort-filter"]`
- `[data-cy="clear-filters"]`

### Carrinho
- `[data-cy="cart-button"]`
- `[data-cy="cart-count"]`
- `[data-cy="cart-sidebar"]`
- `[data-cy="cart-items"]`
- `[data-cy="cart-item"]`
- `[data-cy="cart-total"]`
- `[data-cy="add-to-cart-{id}"]`
- `[data-cy="remove-from-cart-{id}"]`

### Checkout
- `[data-cy="checkout-form"]`
- `[data-cy="checkout-name"]`
- `[data-cy="checkout-cep"]`
- `[data-cy="checkout-address"]`
- `[data-cy="payment-cartao"]`
- `[data-cy="payment-pix"]`
- `[data-cy="payment-boleto"]`
- `[data-cy="finalize-order"]`

## 🔍 Próximos Passos

1. **Execute os testes** para verificar se há algum data-cy attribute faltando
2. **Ajuste os seletores** conforme a implementação real
3. **Execute testes individuais** para validar cada funcionalidade
4. **Execute a suíte completa** para validação final

## 📝 Notas Importantes

- Todos os testes utilizam comandos customizados para reutilização
- Os testes são independentes e podem ser executados em qualquer ordem
- Cada teste limpa o estado anterior quando necessário
- Validações robustas incluem aguardar elementos e verificar estados
- Cenários de erro também são testados para garantir robustez

## 🏁 Resultado Esperado

Com essa suíte de testes, você terá:
- ✅ 100% das funcionalidades principais testadas
- ✅ Comandos reutilizáveis para manutenção fácil
- ✅ Cobertura de cenários de erro
- ✅ Testes de integração completos
- ✅ Documentação clara para toda a equipe
