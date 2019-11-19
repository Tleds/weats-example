'use strict';
const express = require('express');
const router = express.Router();
const menus_controller = require('../menus-controller');
const jwt = require('./jwt-authentication');

//GET
router.get('/:restaurante', jwt.verifyJWT, menus_controller.get)
    //POST
router.post('/', jwt.verifyJWT, menus_controller.post)
    //PUT
router.put('/:menu', jwt.verifyJWT, menus_controller.put)
    //DELETE
router.delete('/:restaurante', jwt.verifyJWT, menus_controller.delete)

module.exports = router;