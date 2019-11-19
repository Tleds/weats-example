'use-strict'
const services_mesas = require('../Model/Services/mesas-services');

function verificaNulo(mesa) {
    if (mesa.id_restaurante != "" &&
        mesa.descricao != "") {
        if (typeof mesa.id_restaurante != "undefined" &&
            typeof mesa.descricao != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}
exports.get = (req, res, next) => {
    if (req.userAccess == 0) {
        services_mesas.all(req).then(function(mesas) {
                res.status(200).json(mesas); //retorna o json com as mesas
            })
            .catch(error => {
                res.status(404).json(error); //retorna o json com as mesas
            })
    } else {
        res.status(500).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.post = (req, res, next) => {
    if (req.userAccess == 1) {
        let mesa = req.body;
        if (verificaNulo(mesa)) {
            services_mesas.create(mesa).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(404).json(error);
            });
        } else {
            res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" });
        }
    } else {
        res.status(500).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.put = (req, res, next) => { //request, responde e next
    if (req.userAccess == 1) {
        if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
            if (verificaNulo(mesa)) {
                services_mesas.update(req).then(result => {
                    res.status(200).json(result);
                }).catch(error => {
                    res.status(404).json(error);
                });
            } else {
                res.status(404).json({ "message": "Erro : O atributo não pode ser nulo" });
            }
        } else {
            res.status(404).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(500).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (req.userAccess == 1) {
        if (typeof req.params.ident != "undefined") { //verificando o parâmetro da requisição
            services_mesas.delete(req).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(404).json(error);
            });
        } else {
            res.status(404).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(500).json({ "auth": false, "message": "Acesso negado" });
    }
}