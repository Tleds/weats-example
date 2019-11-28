'use strict';
const express = require('express');
const router = express.Router();
const mesas_controller = require('../mesas-controller')
const jwt = require('./jwt-authentication');
//GET
router.get('/:restaurante/:mesa', jwt.verifyJWT, mesas_controller.get)
    //POST
router.post('/', mesas_controller.post)
    //PUT
router.put('/:restaurante/:mesa', jwt.verifyJWT, mesas_controller.put)
    //DELETE
router.delete('/:restaurante/:mesa', jwt.verifyJWT, mesas_controller.delete)

module.exports = router;