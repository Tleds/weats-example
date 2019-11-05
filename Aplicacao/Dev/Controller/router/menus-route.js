'use strict';
const express = require('express');
const router = express.Router();
const menus_controller = require('../menus-controller');
const jwt = require('./jwt-authentication');

//GET
router.get('/', jwt.verifyJWT, menus_controller.get)
    //POST
router.post('/', jwt.verifyJWT, menus_controller.post)
    //PUT
router.put('/:id', jwt.verifyJWT, menus_controller.put)
    //DELETE
router.delete('/:ident', jwt.verifyJWT, menus_controller.delete)

module.exports = router;