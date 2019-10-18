'use strict';
const express = require('express');
const router = express.Router();
const login_controller = require('../login-controller')

//POST
router.post('/', login_controller.post)

module.exports = router;