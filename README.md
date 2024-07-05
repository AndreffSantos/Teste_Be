# Teste Técnico Back-end da Be

## Descrição do Projeto

Este projeto é uma API RESTful desenvolvida para gerenciar usuários, clientes, produtos e vendas. O objetivo é fornecer uma solução completa para cadastro e gerenciamento desses dados, permitindo que usuários autenticados realizem operações de CRUD (Create, Read, Update, Delete).

## Tecnologias Utilizadas

- **Framework:** AdonisJs
- **Banco de Dados:** MySQL
- **ORM:** Lucid ORM
- **Autenticação:** JWT (JSON Web Token)

## Estrutura do Banco de Dados

O banco de dados foi estruturado com as seguintes tabelas:

- **usuários**
  - email
  - password

- **clientes**
  - name
  - cpf

- **endereços**
  - customer_id (relacionamento com clientes)
  - street
  - number
  - apartment
  - neighborhood
  - city
  - state
  - postal_code

- **telefones**
  - cliente_id (relacionamento com clientes)
  - phone

- **produtos**
  - name
  - description
  - stock
  - category
  - price
  - is_deleted (campo relacionado a exclusão lógica)

- **vendas**
  - customer_id (relacionamento com clientes)
  - product_id (relacionamento com produtos)
  - amount
  - unit_price
  - total_price
  - created_at

## Rotas do Sistema

### Usuários

- **POST /signup**
  - Cadastro de um novo usuário.

- **POST /login**
  - Autenticação de um usuário existente com JWT.

### Clientes

- **POST /customer**
  - Adiciona um novo cliente e seu endereço e telefone.

- **GET /customers**
  - Lista todos os clientes (apenas nome e cpf) cadastrados, ordenados pelo ID.

- **GET /customer/:id**
  - Detalha um cliente específico e suas vendas, endereço e telefone, com a possibilidade de filtrar as vendas por mês e ano.

- **PUT /customer/:id**
  - Edita as informações de um cliente inclusive endereço e telefone existente.

- **DELETE /customer/:id**
  - Exclui um cliente e suas vendas associadas e seu endereço e telefone.

### Produtos

- **POST /product**
  - Cria um novo produto.

- **GET /products**
  - Lista todos os produtos cadastrados, ordenados alfabeticamente.

- **GET /product/:id**
  - Detalha um produto específico.

- **PUT /product/:id**
  - Edita as informações de um produto existente.

- **DELETE /product/:id**
  - Realiza a exclusão lógica de um produto.

### Vendas

- **POST /sale**
  - Registra uma venda de um produto para um cliente.

### Observação

Todas as rotas de clientes, produtos e vendas só podem ser acessadas por usuários autenticados.

## Instruções para Instalação

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_PROJETO>
   ```

2. **Instale as dependências:**
    ```bash
    npm install
    ```

3. **Configure o arquivo .env:**
    ```bash
    TZ=UTC
    PORT=3333
    HOST=localhost
    LOG_LEVEL=info
    APP_KEY=PZvuoZopqbs6PFmqFNCgTYsNLn75WrxW
    NODE_ENV=development
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=seu_usuario_mysql
    DB_PASSWORD=sua_senha_mysql
    DB_DATABASE=nome_do_banco_de_dados
    ```

4. **Execute as migrações:**
    ```bash
    Execute as migrações:
    ```

5. **Inicie o servidor:**
    ```bash
    adonis serve --dev
    ```

