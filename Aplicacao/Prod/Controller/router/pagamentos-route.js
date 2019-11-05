'use strict';
const express = require('express');
const router = express.Router();
const pagamentos_controller = require('../pagamentos-controller');

//GET
router.get('/', pagamentos_controller.get)
    //POST
router.post('/', pagamentos_controller.post)
    //PUT
router.put('/:id', pagamentos_controller.put)
    //DELETE
router.delete('/:ident', pagamentos_controller.delete)

module.exports = router;