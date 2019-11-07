'use strict';
const express = require('express');
const router = express.Router();
const user_controller = require('../usuarios-controller')
const jwt = require('./jwt-authentication');
//GET
router.get('/', jwt.verifyJWT, user_controller.get)
    //POST
router.post('/', user_controller.post)
    //PUT
router.put('/:id', jwt.verifyJWT, user_controller.put)
    //DELETE
router.delete('/:ident', jwt.verifyJWT, user_controller.delete)

module.exports = router;