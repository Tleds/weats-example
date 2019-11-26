'use-strict'
const services_forma_pagamento = require('../Model/Services/formas_pagamento-services');
const validate = require('../Controller/functions/validate-functions')

exports.get = (req, res, next) => {
    services_forma_pagamento.all().then(result => {
        res.status(200).json(result); //retorna o json com os usuários
    });
}
exports.post = (req, res, next) => {
    if (validate.verificaNulofp(req.body)) {
        services_forma_pagamento.create(req.body).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(result);
        });
    } else {
        res.status(500).json({ "message": "Erro - Atributos nullos" });
    }
}
exports.put = (req, res, next) => { //request, responde e next
    if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
        if (validate.verificaNulofp(req.body)) {
            services_forma_pagamento.update(req).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(404).json(error);
            });
        } else {
            res.status(500).json({ "message": "Erro - Atributos nullos" });
        }
    } else {
        res.status(500).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (typeof req.params.ident != "undefined") { //verificando o parâmetro da requisição
        services_forma_pagamento.delete(req).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(result);
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}