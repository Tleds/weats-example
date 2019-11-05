'use-strict'
const services_menus = require('../Model/Services/menus-services'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const jwt = require('./router/jwt-authentication');

exports.get = (req, res, next) => {
    services_menus.all().then(result => {
        res.status(200).json(result);
    }).catch(result => {
        res.status(404).json(result)
    })
}
exports.post = (req, res, next) => {
    let menu = req.body;
    services_menus.validaRestaurante(menu).then(restaurante => {
        if (restaurante == true) {
            services_menus.create(menu).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(404).json(error);
            })
        } else if (restaurante == false) {
            res.status(500).json({ "message": "O restaurante não existe" })
        }
    })
}
exports.put = (req, res, next) => { //request, responde e next
    if (req.params.id != "") { //verificando o parâmetro da requisição
        services_menus.update(req).then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(404).json(error);
            })
    } else {
        res.status(500).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (req.params.ident != "") { //verificando o parâmetro da requisição
        services_menus.delete(req).then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(404).json(error);
            })
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}