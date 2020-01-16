'use strict';
const express = require('express');
const router = express.Router();
const avaliacao_restaurante_controller = require('../avaliacao_restaurante-controller');
const jwt = require('./jwt-authentication');

//GET
router.get('/', avaliacao_restaurante_controller.get)
//POST
router.post('/', jwt.verifyJWT, avaliacao_restaurante_controller.post)
//PUT
router.put('/', jwt.verifyJWT, avaliacao_restaurante_controller.put)
//DELETE
router.delete('/', jwt.verifyJWT, avaliacao_restaurante_controller.delete)

module.exports = router;