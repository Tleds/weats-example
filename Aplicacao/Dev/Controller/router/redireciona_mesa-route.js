'use strict';
const express = require('express');
const router = express.Router();
const redireciona_mesa_controller = require('../login_mesas-controller')

//POST
router.post('/', redireciona_mesa_controller.post)

module.exports = router;