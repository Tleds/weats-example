'use strict';
const express = require('express');
const router = express.Router();
const notificacao_controller = require('../notificacao-controller');
const jwt = require('./jwt-authentication');

//GET
router.get('/', jwt.verifyJWT, notificacao_controller.get)
    //POST
router.post('/', /*jwt.verifyJWT,*/ notificacao_controller.post)
    //PUT
router.put('/', jwt.verifyJWT, notificacao_controller.put)
    //DELETE
router.delete('/', jwt.verifyJWT, notificacao_controller.delete)

module.exports = router;