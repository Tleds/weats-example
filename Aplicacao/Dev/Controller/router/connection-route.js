'use strict';
const express = require('express');
const router = express.Router();
const connection_controller = require('../connection-controller');
const jwt = require('./jwt-authentication');

//POST
router.post('/', jwt.verifyJWT, connection_controller.post);


module.exports = router;