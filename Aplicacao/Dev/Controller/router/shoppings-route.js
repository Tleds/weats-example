'use strict';
const express = require('express');
const router = express.Router();
const shoppings_controller = require('../shoppings-controller')
const jwt = require('./jwt-authentication');

//GET
router.get('/', shoppings_controller.get)
    //POST
router.post('/', shoppings_controller.post)
    //PUT
router.put('/', shoppings_controller.put)
    //DELETE
router.delete('/', shoppings_controller.delete)

module.exports = router;