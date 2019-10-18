'use strict';
const express = require('express');
const router = express.Router();
const pedidos_controller = require('../pedidos-controller');

//GET
router.get('/', pedidos_controller.get)
    //POST
router.post('/', pedidos_controller.post)
    //PUT
router.put('/:id', pedidos_controller.put)
    //DELETE
router.delete('/:ident', pedidos_controller.delete)

module.exports = router;