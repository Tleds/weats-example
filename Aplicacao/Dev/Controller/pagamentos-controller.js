'use-strict'

const services_pagamentos = require('../Model/Services/pagamentos-services')
const validate = require('./functions/validate-functions')

exports.get = (req, res, next) => {
    if (req.userAccess == 10) {
        services_pagamentos.all().then(result => {
            res.json(result); //retorna o json com os pagamentos
        });
    } else {
        res.status(404).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.post = (req, res, next) => {
    if (req.userAccess == 0) {
        let pagamento = req.body;
        if (validate.verificaNuloPagamento(pagamento)) {
            services_pagamentos.create(pagamento).then(result => {
                    res.status(200).json(result);
                })
                .catch(error => {
                    res.status(404).json(error);
                })
                //Aqui entra a integração com a API de pagamento.
        } else {
            res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" });
        }
    } else {
        res.status(404).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.put = (req, res, next) => { //request, responde e next
    if (req.userAccess == 0) {
        if (req.params.id != "") { //verificando o parâmetro da requisição
            if (validate.verificaNuloPagamento(pagamento)) {
                services_pagamentos.put(req).then(result => {
                    res.status(200).json(result);
                }).catch(error => {
                    res.status(404).json(error);
                });
            } else {
                res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" });
            }
            //Aqui entra a integração com a API de pagamento.
        } else {
            res.status(404).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(404).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (req.userAccess == 0) {
        if (req.params.ident != "") { //verificando o parâmetro da requisição
            services_pagamentos.delete(req).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(404).json(error);
            });
        } else {
            res.status(404).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(404).json({ "auth": false, "message": "Acesso negado" });
    }
}