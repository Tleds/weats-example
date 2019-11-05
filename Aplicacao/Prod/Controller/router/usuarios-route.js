'use strict';
const express = require('express');
const router = express.Router();
const user_controller = require('../usuarios-controller')

//GET
router.get('/', user_controller.get)
    //POST
router.post('/', user_controller.post)
    //PUT
router.put('/:id', user_controller.put)
    //DELETE
router.delete('/:ident', user_controller.delete)

module.exports = router;