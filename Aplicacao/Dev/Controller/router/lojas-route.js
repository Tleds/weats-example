'use strict';
const express = require('express');
const router = express.Router();
const lojas_controller = require('../lojas-controller');
const jwt = require('./jwt-authentication');

//GET
router.get('/', jwt.verifyJWT, lojas_controller.get);
//POST
router.post('/', lojas_controller.post);
//PUT
router.put('/', jwt.verifyJWT, lojas_controller.put);
//DELETE
router.delete('/', jwt.verifyJWT, lojas_controller.delete);

module.exports = router;