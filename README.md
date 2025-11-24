# Vendas Online - Backend

Este repositório contém o backend para uma aplicação de vendas online, desenvolvido com o framework NestJS. O sistema oferece uma API RESTful completa para gerenciar usuários, produtos, carrinhos de compras, pedidos e pagamentos.

## 💻 Front-end & Interface

Este back-end possui um front-end Angular separado que consome esta API. Para testar a aplicação completa (interação usuário-sistema), acesse o repositório abaixo:

👉 [🔗 **Acessar Repositório do Front-end**](https://github.com/Marilio01/vendas-online-web)

### 📸 Screenshots da Aplicação
*(Abaixo estão exemplos da interface consumindo esta API)*

Login | Tela do Cliente | Tela do Administrador |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/be1ef1ed-2573-4b5f-a140-2a3ca2ed1b19" width="280" /> | <img src="https://github.com/user-attachments/assets/0b4efa57-1b31-4cf2-bcf6-dfd07acb31f5" width="280" /> | <img src="https://github.com/user-attachments/assets/435a6b9b-d0b2-4f17-99e6-f77fe4a9c34d" width="280" /> |

### ▶️ Como rodar o Front-end
1. Certifique-se de que este **Back-end** está rodando na porta `8080` (conforme instruções abaixo).
2. Clone o repositório do front-end.
3. Instale as dependências (`npm install`) e execute o projeto (`npm start` / `ng serve`).
4. O front-end se conectará automaticamente à API local.

## 📋 Mapeamento de Casos de Uso

Abaixo estão os detalhes de implementação dos principais fluxos do sistema:

### 1. Fazer Cadastro (Cliente)
* **Descrição:** Permite o registro de novos usuários com criptografia de senha.
* **Rota:** `POST /user`
* **Implementação:**
    * **Controller:** `UserController.createUser` (`src/user/user.controller.ts`)
    * **Service:** `UserService.createUser` (`src/user/user.service.ts`) - Verifica duplicidade de e-mail/CPF e aplica hash na senha.

### 2. Buscar Produtos (Cliente)
* **Descrição:** Listagem paginada de produtos com filtro por nome.
* **Rota:** `GET /product/page?search=...&page=1&size=10`
* **Implementação:**
    * **Controller:** `ProductController.findAllPage` (`src/product/product.controller.ts`)
    * **Service:** `ProductService.findAllPage` (`src/product/product.service.ts`) - Utiliza `ILike` do Postgres para busca flexível.

### 3. Realizar Compra (Cliente)
* **Descrição:** Fecha o pedido convertendo o carrinho atual em uma ordem de compra, vinculando endereço e pagamento.
* **Rota:** `POST /order`
* **Implementação:**
    * **Controller:** `OrderController.createOrder` (`src/order/order.controller.ts`)
    * **Service:** `OrderService.createOrder` (`src/order/order.service.ts`) - Orquestra a validação do carrinho, cálculo final, processamento do pagamento e limpeza do carrinho.

## ⚙️ Principais Funcionalidades

O sistema foi projetado para ser a base de uma plataforma de e-commerce, resolvendo problemas comuns de gestão de vendas e usuários.

* **Autenticação e Gestão de Usuários:**
    * Cadastro e login de usuários com autenticação segura baseada em JWT (JSON Web Tokens).
    * Sistema de controle de acesso baseado em papéis (Roles), diferenciando Usuários comuns, Administradores e Root (`User`, `Admin`, `Root`).
    * Funcionalidades para atualização de senha e dados cadastrais do usuário.

* **Gerenciamento de Endereços:**
    * Cadastro de múltiplos endereços por usuário.
    * Integração com a API dos Correios para consulta de CEP e preenchimento automático de dados de endereço.

* **Catálogo de Produtos e Categorias:**
    * Operações CRUD (Criar, Ler, Atualizar, Deletar) completas para produtos e categorias.
    * Busca paginada de produtos com suporte a filtros.

* **Carrinho de Compras:**
    * Funcionalidades para adicionar, atualizar e remover produtos do carrinho de um usuário.
    * O carrinho é persistido no banco de dados, permitindo que o usuário continue suas compras em diferentes sessões.

* **Gestão de Pedidos e Pagamentos:**
    * Fluxo completo de criação de pedidos a partir dos itens do carrinho.
    * Integração com diferentes tipos de pagamento, incluindo Pix e Cartão de Crédito.
    * Armazenamento do histórico de pedidos por usuário.

* **Database Migrations:**
    * Gerenciamento automatizado do esquema do banco de dados através das migrações do TypeORM.

## ✨ Características Técnicas

* **Framework:** O projeto é construído sobre o **NestJS**, um framework Node.js progressivo que utiliza TypeScript.
* **Linguagem:** Desenvolvido em **TypeScript**.
* **Arquitetura:**
    * **Modular:** Organizado em módulos (`UserModule`, `ProductModule`, `OrderModule`, etc.).
    * **S.O.L.I.D:** Estrutura seguindo boas práticas de design de software.
* **Banco de Dados:** **PostgreSQL** com **TypeORM**.
* **Testes:** Cobertura de testes unitários (`.spec.ts`) e testes de integração (`e2e`).

## 🚀 Instruções de Execução

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão >= 20.11)
* Uma instância do **PostgreSQL** em execução

### 1. Instalação

Primeiro, clone o repositório para a sua máquina:

```bash
https://github.com/Marilio01/vendas-online-backend.git
```

Acesse o diretório do projeto:
```bash
cd vendas-online-backend
```

Em seguida, instale as dependências do projeto:

```bash
npm install
```

### 2. Configuração do Ambiente

Crie um arquivo chamado `.env.development.local` na raiz do projeto.

```env
# Configurações do Banco de Dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario_do_banco
DB_PASSWORD=sua_senha_do_banco
DB_DATABASE=seu_banco_de_dados

# Configurações do JWT
JWT_SECRET=sua_chave_secreta_para_jwt
JWT_EXPIRE_IN=7d

# URL do Serviço dos Correios
URL_CEP_CORREIOS=https://viacep.com.br/ws/{CEP}/json/

# Porta da Aplicação
PORT=8080
```

### 3. Executando a Aplicação

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

### 4. Executando os Testes

```bash
# Testes Unitários
npm run test

# Testes de Integração (E2E)
npm run test:e2e
```

## 🖼️ Modelo de Dados

![Image](https://github.com/user-attachments/assets/37a3e901-a96a-4373-a0ab-32c25fec5acb)