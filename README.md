# Vendas Online - Backend

Este repositório contém o backend para uma aplicação de vendas online, desenvolvido com o framework NestJS. O sistema oferece uma API RESTful completa para gerenciar usuários, produtos, carrinhos de compras, pedidos e pagamentos.

## 💻 Front-end

Este back-end possui um front-end Angular separado que consome esta API. 
Para rodar o sistema completo, clone e execute o front-end disponível em: 

[🔗 Acessar o Front-end](https://github.com/Marilio01/vendas-online-web)

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

## ✨ Características do Sistema Desenvolvido

* **Framework:** O projeto é construído sobre o **NestJS**, um framework Node.js progressivo que utiliza TypeScript, garantindo um código manutenível, escalável e bem-estruturado.

* **Linguagem:** Desenvolvido em **TypeScript**, o que adiciona tipagem estática ao JavaScript, aumentando a robustez e a produtividade no desenvolvimento.

* **Arquitetura:**
    * **Arquitetura Modular:** O sistema é organizado em módulos (`UserModule`, `ProductModule`, `OrderModule`, etc.), promovendo uma clara separação de responsabilidades e facilitando a manutenção e a escalabilidade.
    * **Princípios S.O.L.I.D:** A estrutura segue os princípios de design de software S.O.L.I.D para criar um código mais limpo e coeso.

* **Banco de Dados e ORM:**
    * Utiliza **PostgreSQL** como sistema de gerenciamento de banco de dados.
    * O mapeamento objeto-relacional é gerenciado pelo **TypeORM**, que também é responsável pela execução automática das migrações de banco de dados (`migrationsRun: true`).

* **Validação de Dados:**
    * Uso intensivo de Data Transfer Objects (DTOs) em conjunto com os pacotes `class-validator` e `class-transformer` para garantir que os dados que chegam à API sejam válidos e seguros.

* **Cache:**
    * Implementa uma camada de cache com `@nestjs/cache-manager` para otimizar o desempenho de consultas frequentes, como a busca por cidades e estados.

## 🚀 Instruções de Execução

Siga os passos abaixo para instalar, configurar e executar o projeto em seu ambiente local.

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

O projeto utiliza variáveis de ambiente para configurar a conexão com o banco de dados e outras configurações sensíveis.

Crie um arquivo chamado `.env.development.local` na raiz do projeto.

Preencha o arquivo com as seguintes variáveis, substituindo pelos valores do seu ambiente local:

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

Com as dependências instaladas e o ambiente configurado, você pode executar a aplicação com os seguintes comandos:

#### Modo de Desenvolvimento (com watch)

```bash
npm run start:dev
```

#### Modo de Produção

```bash
# 1. Compilar o projeto
npm run build

# 2. Iniciar o servidor de produção
npm run start:prod
```

### 4. Executando os Testes

O projeto conta com uma suíte de testes unitários e de integração. Para executá-los, utilize:

```bash
# Executar todos os testes
npm run test

# Executar os testes em modo watch
npm run test:watch

# Gerar o relatório de cobertura de testes
npm run test:cov
```

## 🖼️ Modelo de Dados

![Image](https://github.com/user-attachments/assets/37a3e901-a96a-4373-a0ab-32c25fec5acb)