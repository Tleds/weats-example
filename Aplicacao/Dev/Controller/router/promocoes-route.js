'use strict';
const express = require('express');
const router = express.Router();
const promocoes_controller = require('../promocoes-controller');
const jwt = require('./jwt-authentication');

//GET
router.get('/', promocoes_controller.get)
    //POST
router.post('/', /*jwt.verifyJWT,*/ promocoes_controller.post)
    //PUT
router.put('/:id', /*jwt.verifyJWT,*/ promocoes_controller.put)
    //DELETE
router.delete('/:id', /*jwt.verifyJWT,*/ promocoes_controller.delete)

module.exports = router;