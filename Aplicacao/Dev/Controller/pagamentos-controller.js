'use-strict'
const repository_pagamentos = require('../Model/Repository/pagamentos-repository'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const services_pagamentos = require('../Model/Services/pagamentos-services')


exports.get = (req, res, next) => {
    repository_pagamentos.all().then(function(menu) {
        res.json({ menu: menu }); //retorna o json com o menu
    });
}
exports.post = (req, res, next) => {
    repository_pagamentos.create(req.body).then(() => {
        res.status(200).json({ "message": "Menu cadastrado com sucesso" });
    }).catch(error => {
        res.status(404).json({ "message": error });
    })
}
exports.put = (req, res, next) => { //request, responde e next
    if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
        repository_pagamentos.update(req).then(() => {
            res.status(200).json({ "message": "Menu atualizado com sucesso !" });
        }).catch(error => {
            res.status(404).json({ "message": error });
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (typeof req.params.ident != "undefined") { //verificando o parâmetro da requisição
        repository_pagamentos.delete(req).then(() => {
            res.status(200).json({ "message": "Menu excluído com sucesso !" });
        }).catch(error => {
            res.status(404).json({ "message": error });
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}