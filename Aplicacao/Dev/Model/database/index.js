'use strict';
const Sequelize = require('sequelize');
const config = require('../database/config/database');

const Usuarios = require('./models/Usuarios');
const Enderecos = require('./models/Enderecos');
const Formas_pagamento = require('./models/Formas_pagamento');
const Locals = require('./models/Locals');
const Menus = require('./models/Menus');
const Mesas = require('./models/Mesas');
const Pagamentos = require('./models/Pagamentos');
const Pedidos = require('./models/Pedidos');
const Restaurantes = require('./models/Restaurantes');
const Status = require('./models/Status');
const avaliacao_restaurantes = require('./models/avaliacao_restaurante');
const avaliacao_produtos = require('./models/avaliacao_produtos');
const promocoes = require('./models/Promocoes');

const connection = new Sequelize(config);

Usuarios.init(connection);
Enderecos.init(connection);
Formas_pagamento.init(connection);
Locals.init(connection);
Menus.init(connection);
Mesas.init(connection);
Pagamentos.init(connection);
Pedidos.init(connection);
Restaurantes.init(connection);
Status.init(connection); 
avaliacao_restaurantes.init(connection);
avaliacao_produtos.init(connection);
promocoes.init(connection);

Enderecos.associate(connection.models);
Restaurantes.associate(connection.models);
Mesas.associate(connection.models);
Pedidos.associate(connection.models);
avaliacao_restaurantes.associate(connection.models);
avaliacao_produtos.associate(connection.models);
Locals.associate(connection.models);
promocoes.associate(connection.models);

module.exports = connection;
