
# 🌾 API de Gerenciamento de Irrigação

### Desenvolvedor

**Leonardo Garcia Balk — Sistemas de Informação**

---

## 📘 O Projeto

Esta API foi desenvolvida como parte de um desafio prático, com o objetivo de criar um sistema de gerenciamento de irrigação agrícola. Ela permite que usuários autenticados possam:

- Criar e gerenciar **pivôs de irrigação**;
- Registrar **aplicações de irrigação** realizadas;
- **Proteger todos os endpoints com autenticação JWT**;
- **Validar permissões por usuário autenticado**.

A API possui dois módulos principais:
1. **Gerenciamento de pivôs**
2. **Registro de irrigações**

---

## ✅ Funcionalidades

### 🔐 Autenticação
- `POST /auth/register`: Cadastro de usuário com senha hasheada (`bcryptjs`)
- `POST /auth/login`: Login e retorno de token JWT
- Todas as rotas são protegidas via `Authorization: Bearer <token>`

### 💧 Pivôs de irrigação
- `GET /pivots`: Listar todos os pivôs do usuário autenticado
- `GET /pivots/:id`: Ver um pivô específico
- `POST /pivots`: Criar novo pivô
- `PUT /pivots/:id`: Atualizar pivô
- `DELETE /pivots/:id`: Deletar pivô

### 🌱 Registros de irrigação
- `GET /irrigations`: Listar todas as irrigações do usuário
- `GET /irrigations/:id`: Ver irrigação específica
- `POST /irrigations`: Criar irrigação (somente em pivôs do próprio usuário)
- `PUT /irrigations/:id`: Atualizar irrigação
- `DELETE /irrigations/:id`: Deletar irrigação

---

## 🧱 Estrutura das entidades

### Pivô (`/pivots`)
```json
{
  "id": "uuid",
  "description": "Pivô Fazenda A",
  "flowRate": 150.5,
  "minApplicationDepth": 5.0,
  "userId": "uuid do usuário"
}
```

### Irrigação (`/irrigations`)
```json
{
  "id": "uuid",
  "pivotId": "uuid do pivô",
  "applicationAmount": 20.0,
  "irrigationDate": "2025-07-01T10:00:00Z",
  "userId": "uuid do usuário"
}
```

---

## 🚀 Como rodar localmente

### 1. Clonar o projeto
```bash
git clone https://github.com/seu-usuario/irrigacao-api.git
cd irrigacao-api
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar o `.env`
Copie `.env.example` para `.env` e gere um segredo aleatório para `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Cole o resultado no `.env`, sem compartilhar o arquivo. Em produção, configure a mesma variável no serviço de hospedagem. Alterar o segredo invalida os tokens emitidos anteriormente.

### 4. Iniciar o servidor
```bash
node app.js
```

A API estará disponível em `http://localhost:3000`

---

## 📦 Tecnologias utilizadas

- **Node.js**
- **Express.js**
- **JWT** (`jsonwebtoken`)
- **bcryptjs**
- **UUID** (`uuid`)
- **dotenv**
- **Insomnia** (para testes)

---

## 📁 Estrutura de pastas

<img width="229" height="577" alt="image" src="https://github.com/user-attachments/assets/7682941c-26c4-485e-94e4-cb6f58fd8e80" />

---

## 📌 Exemplo de requisição protegida

```http
GET /pivots
Authorization: Bearer <token_jwt>
```

---

## 📋 Observações finais

- A persistência dos dados foi feita **em memória**, como indicado no desafio.
- Todas as rotas são protegidas por autenticação JWT.
- A estrutura pode ser conectada a um banco de dados real.

---

## 📚 Referência do desafio

Este projeto foi desenvolvido como parte do processo seletivo técnico de **Node.js** para a empresa **Irriga Global**.

