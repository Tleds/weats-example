'use strict';
const express = require('express');
const router = express.Router();
const mesas_controller = require('../mesas-controller')
const jwt = require('./jwt-authentication');
//GET
router.get('/', jwt.verifyJWT, mesas_controller.get)
    //POST
router.post('/', jwt.verifyJWT,mesas_controller.post)
    //PUT
router.put('/', jwt.verifyJWT, mesas_controller.put)
    //DELETE
router.delete('/', jwt.verifyJWT, mesas_controller.delete)

module.exports = router;