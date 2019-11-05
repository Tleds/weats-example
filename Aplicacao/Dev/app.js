'use strict' //Força o js a ser mais criterioso com o código
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Carregar as rotas
const user = require('./Controller/router/usuarios-route');
const login = require('./Controller/router/login-route');
const logout = require('./Controller/router/logout-route');
const menus = require('./Controller/router/menus-route');
const restaurantes = require('./Controller/router/restaurantes-route');
const pagamentos = require('./Controller/router/pagamentos-route');
const pedidos = require('./Controller/router/pedidos-route');
//Convém analisar a necessidade
const mesas = require('./Controller/router/mesa-route');
const forma_pagamento = require('./Controller/router/forma_pagamento-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/usuarios', user);
app.use('/login', login);
app.use('/logout', logout);
app.use('/menus', menus);
app.use('/restaurantes', restaurantes);
app.use('/pagamentos', pagamentos);
app.use('/pedidos', pedidos);
//Convém analisar a necessidade
app.use('/mesas', mesas);
app.use('/formas_pagamento', forma_pagamento);


module.exports = app;