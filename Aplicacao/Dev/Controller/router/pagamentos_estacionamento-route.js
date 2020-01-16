'use strict';
const express = require('express');
const router = express.Router();
const pagamentos_controller = require('../pagamento_estacionamento-controller');
const jwt = require('./jwt-authentication');

//GET
router.get('/', jwt.verifyJWT, pagamentos_controller.get)
    //POST
router.post('/', jwt.verifyJWT, pagamentos_controller.post)
    //PUT
router.put('/', jwt.verifyJWT, pagamentos_controller.put)
    //DELETE
router.delete('/', jwt.verifyJWT, pagamentos_controller.delete)

module.exports = router;