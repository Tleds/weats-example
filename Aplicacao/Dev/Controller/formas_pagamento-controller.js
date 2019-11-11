'use-strict'
const services_forma_pagamento = require('../Model/Services/formas_pagamento-services');

function verificaNulo(forma_pagamento) {
    if (forma_pagamento.descricao != "" &&
        forma_pagamento.tipo_forma_pagamento != "" &&
        forma_pagamento.bandeira != "") {
        if (typeof forma_pagamento.descricao != "undefined" &&
            typeof forma_pagamento.tipo_forma_pagamento != "undefined" &&
            typeof forma_pagamento.bandeira != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}
exports.get = (req, res, next) => {
    services_forma_pagamento.all().then(result => {
        res.status(200).json(result); //retorna o json com os usuários
    });
}
exports.post = (req, res, next) => {
    if (verificaNulo(req.body)) {
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
        if (verificaNulo(req.body)) {
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