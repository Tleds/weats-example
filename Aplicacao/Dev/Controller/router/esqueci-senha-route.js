'use strict';
const express = require('express');
const router = express.Router();
const esqueci_senha_controller = require('../esqueci-senha-controller')

//GET
router.get('/', esqueci_senha_controller.get);
//POST
router.post('/', esqueci_senha_controller.post);


module.exports = router;