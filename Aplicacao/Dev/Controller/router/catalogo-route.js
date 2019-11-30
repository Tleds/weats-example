'use strict';
const express = require('express');
const router = express.Router();
const catalogo_controller = require('../catalogo-controller')
const jwt = require('./jwt-authentication');

//GET
router.get('/', jwt.verifyJWT, catalogo_controller.get)

module.exports = router;