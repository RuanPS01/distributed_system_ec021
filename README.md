# Inatel - Tópicos Avançados II - Sistemas Distribuídos

## Único integrante do projeto:
    - Ruan Patrick de Souza
## Dependências
- [Node.js](https://nodejs.org/en/): Interpretador JavaScript
- [NPM](https://www.npmjs.com/): Gerenciador de pacotes Node.js

## Bibliotecas
### Produção
- [Restify](http://restify.com/): Framework Node.js
- [Restify Router](https://www.npmjs.com/package/restify-router): Gerenciamento de rotas
- [Axios](https://github.com/axios/axios): Comunicação HTTP com o servidor de Autenticação
- [Mongoose](https://mongoosejs.com/): Comunicação e controle do banco de dados MongoDB.
- [Serve-static-restify](https://github.com/makeomatic/serve-static-restify): Responsável por disponibilizar a execução html na porta 3000.

## Configuração
1. Certifique-se que a porta 3000 não está sendo usada.

## Execução
1. Faça o clone/download do repositório.
1. Abra a pasta /src:

    - Execute o comando: `npm install`
    - (Opicional) Ou execute: `npm i --save restify axios mongoose serve-static-restify -S restify-router`

1. Para iniciar a aplicação siga dois passos:

    - Execute o comando `node app.js`
    - Abra o endereço localhost:3000 no navegador.