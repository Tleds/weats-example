'use strict' //Força o js a ser mais criterioso com o código
require("dotenv").config({
  path:process.env.NODE_ENV == 'teste' ? '.env.teste' : '.env'
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
const compression = require('compression');

//Carregar as rotas
const user = require('./Controller/router/usuarios-route');
const login = require('./Controller/router/login-route');
const login_restaurante = require('./Controller/router/login_restaurantes-route');
const logout = require('./Controller/router/logout-route');
const menus = require('./Controller/router/menus-route');
const restaurantes = require('./Controller/router/restaurantes-route');
const pagamento_restaurantes = require('./Controller/router/pagamentos_restaurantes-route');
const pagamento_estacionamento = require('./Controller/router/pagamentos_estacionamento-route');
const pedidos = require('./Controller/router/pedidos-route');
const mesas = require('./Controller/router/mesas-route');
const forma_pagamento = require('./Controller/router/forma_pagamento-route');
const esqueci_senha = require('./Controller/router/esqueci-senha-route');
const connection = require('./Controller/router/connection-route');
const catalogo = require('./Controller/router/catalogo-route');
const avaliacao_restaurante = require('./Controller/router/avaliacao_restaurante-route');
const avaliacao_produto = require('./Controller/router/avaliacao_produto-route');
const promocoes = require('./Controller/router/promocoes-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use('/usuarios', user);
app.use('/login', login);
app.use('/logout', logout);
app.use('/menus', menus);
app.use('/restaurantes', restaurantes);
app.use('/pagamento_restaurantes', pagamento_restaurantes);
app.use('/pagamento_estacionamento', pagamento_estacionamento);
app.use('/pedidos', pedidos);
app.use('/mesas', mesas);
app.use('/formas_pagamento', forma_pagamento);
app.use('/esqueci_senha', esqueci_senha);
app.use('/login_restaurante',login_restaurante);
app.use('/connection',connection);
app.use('/catalogo', catalogo);
app.use('/avaliacao_restaurante',avaliacao_restaurante);
app.use('/avaliacao_produto',avaliacao_produto);
app.use('/promocoes',promocoes);

app.listen(PORT,HOST);

module.exports = app;