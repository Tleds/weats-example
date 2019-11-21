'use-strict'
const repository_restaurantes = require('../Model/Repository/restaurantes-repository'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const services = require('../Model/Services/restaurantes-services');

function verificaNulo(restaurante) {
    if (restaurante.nome != "" &&
        restaurante.cnpj != "" &&
        restaurante.email != "" &&
        restaurante.telefone != "") {
        if (typeof restaurante.nome != "undefined" &&
            typeof restaurante.cnpj != "undefined" &&
            typeof restaurante.email != "undefined" &&
            typeof restaurante.telefone != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}

exports.getShopping = (req, res, next) => {
    if (req.userAccess == 0 || req.userAccess == 10) {
        repository_restaurantes.all(req.connection.local).then(restaurante => {
            res.json({ restaurante: restaurante }); //retorna o json com os usuários
        });
    } else {
        res.status(404).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.getId = (req, res, next) => {
    if (req.userAccess == 10) {
        repository_restaurantes.readById(req.userId).then(restaurante => {
            res.json(restaurante); //retorna o json com os usuários
        });
    } else {
        res.status(404).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.post = (req, res, next) => {
    let restaurante = req.body;
    if (verificaNulo(restaurante) && (restaurante.senha != "" && typeof restaurante.senha != 'undefined')) {
        services.validaEmailRestaurante(req.body).then(email => {
            if (email > 0) {
                res.status(500).json({ "message": "E-mail já cadastrado" });
            }
            if (email == 0) {
                services.validaCnpjRestaurante(req.body).then(cnpj => {
                    if (cnpj == 0) {
                        services.create(req.body).then(result => {
                                res.status(200).json(result);
                            })
                            .catch(error => {
                                res.status(404).json(error);
                            })

                    } else {
                        res.status(404).json({ "message": "CNPJ já cadastrado" });
                    }
                });
            }
        });
    } else {
        res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" });
    }
}
exports.put = (req, res, next) => { //request, responde e next
    let restaurante = req.body;
    if (req.userId != null) { //verificando o parâmetro da requisição
        if (verificaNulo(restaurante)) {
            if (req.body.email != null) {
                services.validaCnpjRestaurante(restaurante).then(cnpj => {
                    if (cnpj == 1) {
                        services.atualiza(req).then(result => {
                                res.status(200).json(result);
                            })
                            .catch(error => {
                                res.status(404).json(error);
                            })
                    } else {
                        res.status(404).json({ "message": "CNPJ inválido" });
                    }
                });
            } else {
                res.status(404).json({ "message": "Email nulo" });
            }
        } else {
            res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" });
        }
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (req.userId != null) { //verificando o parâmetro da requisição
        services.delete(req).then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(404).json(error);
            })
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}