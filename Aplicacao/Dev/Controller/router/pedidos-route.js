'use strict';
const express = require('express');
const router = express.Router();
const pedidos_controller = require('../pedidos-controller');
const jwt = require('./jwt-authentication');

//GET
router.get('/', jwt.verifyJWT, pedidos_controller.get)
    //POST
router.post('/', jwt.verifyJWT, pedidos_controller.post)
    //PUT
router.put('/', jwt.verifyJWT, pedidos_controller.put)
    //DELETE
router.delete('/', jwt.verifyJWT, pedidos_controller.delete)

module.exports = router;