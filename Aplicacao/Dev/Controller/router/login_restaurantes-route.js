'use strict';
const express = require('express');
const router = express.Router();
const login_restaurante_controller = require('../login_restaurante-controller')

//POST
router.post('/', login_restaurante_controller.post)

module.exports = router;