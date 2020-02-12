'use strict';
const express = require('express');
const router = express.Router();
const menus_loja_controller = require('../menus_loja-controller');
const jwt = require('./jwt-authentication');

//GET
router.get('/:id_loja', menus_loja_controller.get);
//POST
router.post('/', menus_loja_controller.post);
//PUT
router.put('/', menus_loja_controller.put);
//DELETE
router.delete('/', menus_loja_controller.delete);

module.exports = router;