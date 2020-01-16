'use strict';
const express = require('express');
const router = express.Router();
const avaliacao_produto_controller = require('../avaliacao_produto-controller');
const jwt = require('./jwt-authentication');

//GET
router.get('/', avaliacao_produto_controller.get)
//POST
router.post('/', jwt.verifyJWT, avaliacao_produto_controller.post)
//PUT
router.put('/', jwt.verifyJWT, avaliacao_produto_controller.put)
//DELETE
router.delete('/', jwt.verifyJWT, avaliacao_produto_controller.delete)

module.exports = router;