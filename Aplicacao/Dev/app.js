'use strict' //Força o js a ser mais criterioso com o código
require("dotenv-safe").config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


//Carregar as rotas
const user = require('./Controller/router/usuarios-route');
const login = require('./Controller/router/login-route');
const login_restaurante = require('./Controller/router/login_restaurantes-route');
const logout = require('./Controller/router/logout-route');
const menus = require('./Controller/router/menus-route');
const restaurantes = require('./Controller/router/restaurantes-route');
const pagamentos = require('./Controller/router/pagamentos-route');
const pedidos = require('./Controller/router/pedidos-route');
const mesas = require('./Controller/router/mesas-route');
const forma_pagamento = require('./Controller/router/forma_pagamento-route');
const esqueci_senha = require('./Controller/router/esqueci-senha-route');
const connection = require('./Controller/router/connection-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/usuarios', user);
app.use('/login', login);
app.use('/logout', logout);
app.use('/menus', menus);
app.use('/restaurantes', restaurantes);
app.use('/pagamentos', pagamentos);
app.use('/pedidos', pedidos);
app.use('/mesas', mesas);
app.use('/formas_pagamento', forma_pagamento);
app.use('/esqueci_senha', esqueci_senha);
app.use('/login_restaurante',login_restaurante);
app.use('/connection',connection);

module.exports = app;