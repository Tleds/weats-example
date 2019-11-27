'use-strict'
const services_menus = require('../Model/Services/menus-services'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const validate = require('./functions/validate-functions')

exports.get = (req, res, next) => {
    if(req.headers.id_restaurante !== "" && typeof req.headers.id_restaurante !== 'undefined')
    {
    services_menus.all(req.headers.id_restaurante).then(result => {
        result = {
            "id_mesa":req.headers.id_mesa,
            result
        }
        res.status(200).json(result);
    }).catch(result => {
        res.status(500).json(result)
    })
    } else{
        res.status(400).json({"message":"restaurante não pode ser nulo", "result":false});
    }
}
exports.post = (req, res, next) => {
    if (req.userAccess == 1 || req.userAccess == 10) {
        let menu = req.body;
        if (validate.verificaNuloMenu(menu)) {
            services_menus.validaRestaurante(menu).then(restaurante => {
                if (restaurante == true) {
                    services_menus.create(menu).then(result => {
                        res.status(200).json(result);
                    }).catch(error => {
                        res.status(500).json(error);
                    })
                } else if (restaurante == false) {
                    res.status(400).json({ "message": "O restaurante não existe" });
                }
            })
        } else {
            res.status(400).json({ "message": "Erro : O atributo não pode ser nullo" });
        }
    } else {
        res.status(403).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.put = (req, res, next) => { //request, responde e next
    let menu = req.body;
    if (req.userAccess == 1 || req.userAccess == 10) {
        if (req.params.menu != "") { //verificando o parâmetro da requisição
            if (validate.verificaNuloMenu(menu)) {
                services_menus.update(req).then(result => {
                        res.status(200).json(result);
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    })
            } else {
                res.status(400).json({ "message": "Erro : O atributo não pode ser nullo" });
            }
        } else {
            res.status(400).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(403).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (req.userAccess == 1 || req.userAccess == 10) {
        if (req.params.ident != "") { //verificando o parâmetro da requisição
            services_menus.delete(req).then(result => {
                    res.status(200).json(result);
                })
                .catch(error => {
                    res.status(500).json(error);
                })
        } else {
            res.status(400).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(403).json({ "auth": false, "message": "Acesso negado" });
    }
}