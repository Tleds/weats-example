'use strict';
const express = require('express');
const router = express.Router();
const formas_pagamento_controller = require('../formas_pagamento-controller')

//GET
router.get('/', formas_pagamento_controller.get)
    //POST
router.post('/', formas_pagamento_controller.post)
    //PUT
router.put('/:id', formas_pagamento_controller.put)
    //DELETE
router.delete('/', formas_pagamento_controller.delete)

module.exports = router;