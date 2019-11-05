'use strict';
const express = require('express');
const router = express.Router();
const restaurantes_controller = require('../restaurantes-controller')
const jwt = require('./jwt-authentication');

//GET
router.get('/', jwt.verifyJWT, restaurantes_controller.get)
    //POST
router.post('/', restaurantes_controller.post)
    //PUT
router.put('/:id', jwt.verifyJWT, restaurantes_controller.put)
    //DELETE
router.delete('/:ident', jwt.verifyJWT, restaurantes_controller.delete)

module.exports = router;