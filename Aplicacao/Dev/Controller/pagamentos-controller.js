'use-strict'

const services_pagamentos = require('../Model/Services/pagamentos-services')
const validate = require('./functions/validate-functions')

module.exports={

    async get(req, res, next) {
        if (req.userAccess != 10 && req.userAccess != 1) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        let resposta = await services_pagamentos.all(req.userId);
        if(!resposta){res.status(500).json(resposta);return}

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
        //Aqui entra a integração com a API de pagamento.
    },
    async put(req, res, next){ //request, responde e next
        if (req.userAccess == 0) {
            if (req.params.id != "") { //verificando o parâmetro da requisição
                if (validate.verificaNuloPagamento(pagamento)) {
                    services_pagamentos.put(req).then(result => {
                        res.status(200).json(result);
                    }).catch(error => {
                        res.status(500).json(error);
                    });
                } else {
                    res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });
                }
                //Aqui entra a integração com a API de pagamento.
            } else {
                res.status(400).json({ "message": "Identificador inválido" });
            }
        } else {
            res.status(403).json({ "auth": false, "message": "Acesso negado" });
        }
    },
    async delete(req, res, next){ //request, responde e next   
        if (req.userAccess == 0) {
            if (req.userId != "") { //verificando o parâmetro da requisição
                services_pagamentos.delete(req).then(result => {
                    res.status(200).json(result);
                }).catch(error => {
                    res.status(500).json(error);
                });
            } else {
                res.status(400).json({ "message": "Identificador inválido" });
            }
        } else {
            res.status(403).json({ "auth": false, "message": "Acesso negado" });
        }
    }
}