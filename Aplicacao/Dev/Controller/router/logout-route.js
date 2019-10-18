'use strict';
const express = require('express');
const router = express.Router();
const logout_controller = require('../logout-controller')

//GET
router.get('/', logout_controller.get)

module.exports = router;