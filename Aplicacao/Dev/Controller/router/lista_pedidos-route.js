'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('./jwt-authentication');
const lista_pedidos = require('../lista_pedidos-controller')

//POST
router.get('/',jwt.verifyJWT, lista_pedidos.get)

module.exports = router;