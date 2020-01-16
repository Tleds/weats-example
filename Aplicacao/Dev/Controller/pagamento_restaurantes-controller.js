'use-strict'

const services_pagamentos = require('../Model/Services/pagamento_restaurantes-services')
const validate = require('./functions/validate-functions')

module.exports={
    async get(req, res, next) {
        if (req.userAccess != 10 && req.userAccess != 1) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        
        let resposta = await services_pagamentos.all(req.userId);
        if(!resposta.result){res.status(500).json(resposta);return}

        res.status(200).json(resposta);
        return
    },
    async post(req, res, next){
        if (req.userAccess != 0 && req.userAccess != 10) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        
        let pagamento = req.body;
        if (!validate.verificaNuloPagamento(pagamento)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });return}
        
        let resposta = await services_pagamentos.create(pagamento);
        if(!resposta.result){res.status(500).json(resposta);return}
                
        res.status(200).json(resposta);
        return
        //Aqui entra a integração com a API de pagamento para efetuar um pagamento.
    },
    async put(req, res, next){ //request, responde e next
        if (req.userAccess != 0) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        
        if (!req.body.id_pagamento) {res.status(400).json({ "message": "Identificador inválido" });return}
        
        if (validate.verificaNuloPagamento(pagamento)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });return}
        
        let resposta = await services_pagamentos.put(req)
        if(!resposta.result){res.status(500).json(resposta);return}
        
        res.status(200).json(resposta);
        //Aqui entra a integração com a API de pagamento paga alterar um pagamento
        return
    },
    async delete(req, res, next){ //request, responde e next   
        if (req.userAccess != 0) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        if (!req.userId) {res.status(400).json({ "message": "Identificador inválido" });return}
        
        let resposta = await services_pagamentos.delete(req)
        if(resposta.result){res.status(500).json(resposta);return}
        
        res.status(500).json(resposta);
        //Aqui entra a integração com a API de pagamento para cancelar um pagamento
        return
    }
}