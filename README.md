# 🛒 Products API

Esta é uma API simples para gerenciar produtos utilizando o framework [AdonisJS](https://adonisjs.com/). Ela permite criar e buscar produtos, armazenando-os temporariamente na memória.

## 🛠️ Tecnologias Utilizadas

- **Framework**: [AdonisJS](https://adonisjs.com/) 
- **Versão do Node.js**: `>= 20.9.0`

## 🚀 Instalação

### Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina. Você pode verificar se estão instalados com os seguintes comandos:

```bash
node -v
npm -v

### Passos para rodar o projeto

> git clone git@github.com:CAIOZIn1/Adonis-CRUD.git

> cd SIMPLEAGRO

> npm install | yarn install

### Inicie o servidor

> npm run dev
```

## 🔀 Rotas Disponíveis


### Routes

```bash
### produtos
GET -> /products

GET -> /productsGroup/:id

GET -> /product/:id

POST -> /product

PUT -> /product/:id

DELETE -> /product/:id

### grupos
GET -> /groups

GET -> /group/:id

POST -> /createGroup

PUT -> /group/:id

DELETE -> /deleteGroup/:id
```

## 👌 cURLs
 
```bash
curl --request POST \
  --url http://localhost:3333/product \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.1' \
  --cookie sessionId=d6c97c7d-c5c4-4514-9f8e-b76e3b123179 \
  --data '{
	"name": "Limão",
	"qtd": 5,
	"groupID": "b7290b37-6a04-425f-8906-634370a2d36d"
}'
```

```bash
curl --request POST \
  --url http://localhost:3333/createGroup \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.1' \
  --cookie sessionId=d6c97c7d-c5c4-4514-9f8e-b76e3b123179 \
  --data '{
	"name": "Verduras"
}'
```

```bash
curl --request GET \
  --url http://localhost:3333/product/49ab385a-df10-4105-aee2-3abb1c8f1b6a \
  --header 'Cookie: sessionId=d6c97c7d-c5c4-4514-9f8e-b76e3b123179' \
  --header 'User-Agent: insomnia/8.6.1' \
  --cookie sessionId=d6c97c7d-c5c4-4514-9f8e-b76e3b123179
  ```

  ```bash
  curl --request GET \
  --url http://localhost:3333/group/50ba226f-d066-425b-bb57-84326a5ee648 \
  --header 'Cookie: sessionId=d6c97c7d-c5c4-4514-9f8e-b76e3b123179' \
  --header 'User-Agent: insomnia/8.6.1' \
  --cookie sessionId=d6c97c7d-c5c4-4514-9f8e-b76e3b123179
  ```

## 🧪 TESTES

### Pré requisitos

Antes de rodar os testes, certifique-se de que a sua aplicação esteja em execução. Você pode fazer isso usando os comandos abaixo:

```bash
nvm use && npm install || yarn install && npm run dev || yarn dev
```

Após garantir que a aplicação está no ar, execute o seguinte comando para rodar os testes dos controladores em tempo real:

```bash
npm run test:controllers:watch || yarn test:controllers:watch
```

Se preferir visualizar a execução completa dos testes, incluindo a cobertura do código, utilize:

```bash
npm run test:controllers:watch || yarn test:controllers:watch
```

Isso permitirá que você verifique a qualidade dos testes em toda a aplicação e visualize as métricas de cobertura de código.

## 📌 Observações

Os produtos são armazenados temporariamente na memória, ou seja, se o servidor for reiniciado, os dados serão perdidos.
AdonisJS utiliza o padrão singleton para controllers, garantindo que o array de produtos seja compartilhado entre diferentes requisições dentro da mesma sessão do servidor.
