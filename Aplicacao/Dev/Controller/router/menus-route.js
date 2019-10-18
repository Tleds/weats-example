'use strict';
const express = require('express');
const router = express.Router();
const menus_controller = require('../menus-controller');

//GET
router.get('/', menus_controller.get)
    //POST
router.post('/', menus_controller.post)
    //PUT
router.put('/:id', menus_controller.put)
    //DELETE
router.delete('/:ident', menus_controller.delete)

module.exports = router;