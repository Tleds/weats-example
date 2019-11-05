'use strict';
const express = require('express');
const router = express.Router();
const mesas_controller = require('../mesas-controller')

//GET
router.get('/', mesas_controller.get)
    //POST
router.post('/', mesas_controller.post)
    //PUT
router.put('/:id', mesas_controller.put)
    //DELETE
router.delete('/:ident', mesas_controller.delete)

module.exports = router;