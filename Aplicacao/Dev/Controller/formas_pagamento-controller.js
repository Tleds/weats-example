'use-strict'
const services_forma_pagamento = require('../Model/Services/formas_pagamento-services');
const validate = require('../Controller/functions/validate-functions')

module.exports = {
    async get(req, res, next){
        let resposta = await services_forma_pagamento.all();
        res.status(200).json(resposta); //retorna o json com os usuários
        return
        
    },
    async post(req, res, next){
        if (!validate.verificaNulofp(req.body)) {res.status(400).json({ "message": "Erro - Atributos nullos" });return}
        
        let resposta = await services_forma_pagamento.create(req.body)
        if(!resposta.result){res.status(500).json(resposta);return}
        res.status(200).json(resposta);
        return
    },
    async put(req, res, next){ //request, responde e next
        if (!req.body.id_forma_pagamento) {res.status(400).json({ "message": "Identificador inválido" });return}
        if (!validate.verificaNulofp(req.body)) {res.status(400).json({ "message": "Erro - Atributos nullos" });return}
        
        let resposta = await services_forma_pagamento.update(req);
        if(!resposta.result){res.status(500).json(resposta);return}
        res.status(200).json(resposta);
        return
    },
    async delete(req, res, next){ //request, responde e next   
        if (!req.body.id_forma_pagamento) {res.status(400).json({ "message": "Identificador inválido" });return}
        
        let resposta = await services_forma_pagamento.delete(req);
        if(resposta.result){res.status(500).json(resposta);return}
        res.status(200).json(resposta);
        return
    }
}