# OrderHub API

Backend profissional desenvolvido com NestJS, Prisma ORM e PostgreSQL.

O projeto foi criado com foco em arquitetura escalável, autenticação JWT, controle de permissões baseado em roles e boas práticas de desenvolvimento backend.

Além disso, o sistema possui integração com APIs externa, incluindo o Stripe, utilizado para processamento de pagamentos via Checkout, com suporte a webhooks para confirmação de transações em tempo real.

---

# Tecnologias Utilizadas

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Passport
* Bcrypt
* Class Validator
* Stripe(Pagamentos)

---

# Funcionalidades

## Autenticação

* Registro de usuários
* Login com JWT
* Hash de senha com bcrypt
* Autenticação stateless
* Rotas protegidas

---

## Authorization 

* Controle de permissões por role
* Guard customizado
* Decorators customizados
* Rotas exclusivas para ADMIN

---

## Pedidos

* Criação de pedidos
* Atualização de status
* Relação entre pedidos e produtos
* Cálculo automático de total no backend
* Persistência de valor unitário no item (anti-fraude)

---

## Pagamentos (Stripe)

* Integração com Stripe Checkout
* Criação de sessão de pagamento via API
* Redirecionamento para página segura do Stripe
* Webhook para confirmação de pagamento
* Atualização automática de status do pedido (PENDING → PAID)
* 


---

## Usuários

* Usuário autenticado
* Endpoint `/users/me`
* Roles de usuário

---

# Arquitetura

O projeto segue arquitetura modular utilizando os princípios do NestJS.

```txt
src/
 ├── common/
 │    ├── decorators/
 │    └── guards/
 │
 ├── modules/
 │    ├── auth/
 │    ├── users/
 │    └── orders/
 │
 ├── prisma/
 │
 ├── app.module.ts
 │
 └── main.ts
```

---

# Banco de Dados

O projeto utiliza PostgreSQL com Prisma ORM.

## Entidades principais

* User
* Company
* Product
* Order
* OrderItem
* AuditLog

---

# Configuração do Ambiente

## Clonar repositório

```bash
git clone https://github.com/isaque-v66/orderhub-api.git
```

---

## Instalar dependências

```bash
npm install
```

---

## Criar arquivo .env

```env
DATABASE_URL="SEU_BANCO"
JWT_SECRET="super_secret_key"
```

---

# Prisma

## Gerar client

```bash
npx prisma generate
```

## Executar migrations

```bash
npx prisma migrate dev
```

## Abrir Prisma Studio

```bash
npx prisma studio
```

---

# Executando o Projeto

## Desenvolvimento

```bash
npm run start:dev
```

Servidor:

```txt
http://localhost:3000
```

---

# Endpoints

## Auth

### Registro

```http
POST /auth/register
```

Body:

```json
{
  "email": "admin@email.com",
  "password": "123456",
  "companyId": "COMPANY_ID"
}
```

---

### Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "admin@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "access_token": "JWT_TOKEN"
}
```

---

## Usuário autenticado

```http
GET /users/me
```

Headers:

```txt
Authorization: Bearer TOKEN
```

---

## Rota ADMIN

```http
GET /users/admin
```

---

# Segurança

* Hash de senha com bcrypt
* JWT stateless
* Guards de autenticação
* Guards de autorização
* Validação global com ValidationPipe

---

# Conceitos Aplicados

* Dependency Injection
* Modular Architecture
* RBAC
* Stateless Authentication
* REST API
* Prisma Relations
* PostgreSQL Relational Modeling
* DTO Validation
* Guards

---

# Próximas Melhorias

* Swagger
* Docker
* Refresh Token
* Upload de arquivos
* Cache
  

---



