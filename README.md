# Microsserviço de autenticação em Nodejs

Este projeto é um **microsserviço de autenticação** de usuário.👥

### Arquitetura

#### 📂Environments

> Reúne chaves e variáveis sensíveis.

#### 📂Models

> Contém modelos de entidades e objetos de erro.

#### 📂Repositories

> Salva os dados no banco de dados.

#### 📂Middlewares

> Responsável por ações como autenticação de rotas e tratamento de erros.

#### 📂Database

> Cria as conexões necessárias com o banco de dados.

### Este projeto usa

- Node
- Typescript
- Postgres
- JWT

### Como rodar o projeto

1 - Clone o repositório

2 - Instale todas as dependências:

---

    npm install

---

3 - Crie um arquivo **.env** na raiz do projeto e o preencha com as variáveis de ambiente assim como no arquivo de exemplo **.env.example**.

4 - Execute o script de build e start:

---

    npm run dev

---

### endpoints

## **Rota base:**

    http://localhost:3000/

---

**_POST_** /token

Autentica o usuário na aplicação, como em um login.

**_Retorna um token que deve ser usado nas rotas de usuário!_**

Envie o username e password nos campos de autenticação do tipo **basic**.

##### Exemplo:

      username: 'admin',
      password: 'admin123'

---

**_GET_** /users

Retorna todos os users cadastrados.

obs: Necessário envio de token no campo de autenticação do tipo **bearer**.

**_POST_** /users

Cria um novo usuário no banco de dados.

obs: Necessário envio de token no campo de autenticação do tipo **bearer**. Necessário envio de informações no body da requisição.

##### Formato:

    body {
        username: 'admin',
        password: 'admin123'
    }

---

**_GET_** /users/:id

Retorna o usuário do id indicado no parâmetro.

obs: Necessário envio de token no campo de autenticação do tipo **bearer**. O id segue o formato uuid4.

---

**_PUT_** /users/:id

Atualiza o usuário do id indicado no parâmetro com as novas informações.

obs: Necessário envio de token no campo de autenticação do tipo **bearer**. O id segue o formato uuid4. Necessário envio de informações no body da requisição.

##### Formato:

    body {
        username: 'admin',
        password: 'admin123'
    }

---

**_DELETE_** /users/:id

Deleta o usuário do id indicado no parâmetro com as novas informações.

obs: Necessário envio de token no campo de autenticação do tipo **bearer**. O id segue o formato uuid4.

---

**_POST_** /token/validate

Valida se a autenticação permanece válida.

obs: Necessário envio de token no campo de autenticação do tipo **bearer**.

---

Feito com :heart: por [felipelouzeiro]('https://github.com/felipelouzeiro');
