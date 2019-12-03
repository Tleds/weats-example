'use strict';
const express = require('express');
const router = express.Router();
const user_controller = require('../usuarios-controller')
const jwt = require('./jwt-authentication');
    //GET
//router.get('/', /*jwt.verifyJWT,*/ user_controller.get)
    //GET com id
router.get('/', jwt.verifyJWT, user_controller.getId)
    //POST
router.post('/', user_controller.post)
    //PUT
router.put('/', jwt.verifyJWT, user_controller.put)
    //DELETE
router.delete('/', jwt.verifyJWT, user_controller.delete)

module.exports = router;