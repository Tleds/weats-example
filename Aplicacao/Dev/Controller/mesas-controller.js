'use-strict'
const services_mesas = require('../Model/Services/mesas-services');

exports.get = (req, res, next) => {
    services_mesas.all().then(function(mesas) {
            res.status(200).json(mesas); //retorna o json com as mesas
        })
        .catch(error => {
            res.status(404).json(error); //retorna o json com as mesas
        })
}
exports.post = (req, res, next) => {
    services_mesas.create(req.body).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(404).json(error);
    });
}
exports.put = (req, res, next) => { //request, responde e next
    if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
        services_mesas.update(req).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(error);
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (typeof req.params.ident != "undefined") { //verificando o parâmetro da requisição
        services_mesas.delete(req).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(error);
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}