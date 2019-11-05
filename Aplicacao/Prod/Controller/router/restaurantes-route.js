'use strict';
const express = require('express');
const router = express.Router();
const restaurantes_controller = require('../restaurantes-controller')

//GET
router.get('/', restaurantes_controller.get)
    //POST
router.post('/', restaurantes_controller.post)
    //PUT
router.put('/:id', restaurantes_controller.put)
    //DELETE
router.delete('/:ident', restaurantes_controller.delete)

module.exports = router;