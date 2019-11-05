'use-strict'
const repository_restaurantes = require('../Model/Repository/restaurantes-repository'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const services = require('../Model/Services/restaurantes-services');


exports.get = (req, res, next) => {
    repository_restaurantes.all().then(function(user) {
        res.json({ user: user }); //retorna o json com os usuários
    });
}
exports.post = (req, res, next) => {
    services.validaEmailRestaurante(req.body).then(email => {
        if (email > 0) {
            res.status(500).json({ "message": "E-mail já cadastrado" });
        }
        if (email == 0) {
            services.validaCnpjRestaurante(req.body).then(cnpj => {
                if (cnpj == 0) {
                    services.create(req.body).then(result => {
                        if (result == true) {
                            res.status(200).json({ "message": "Restaurante cadastrado com sucesso" });
                        } else {
                            res.status(404).json({ "message": error });
                        }
                    })

                } else {
                    res.status(404).json({ "message": "CNPJ já cadastrado" });
                }
            });
        }
    });
}
exports.put = (req, res, next) => { //request, responde e next
    if (req.params.id != null) { //verificando o parâmetro da requisição
        if (req.body.email != null) {
            services.validaCnpjRestaurante(req.body).then(cnpj => {
                if (cnpj == 1) {
                    services.atualiza(req).then(result => {
                        if (result == true) {
                            res.status(200).json({ "message": "Restaurante atualizado com sucesso !" });
                        } else {
                            res.status(404).json({ "message": result });
                        }
                    })
                } else {
                    res.status(404).json({ "message": "CNPJ inválido" });
                }
            });
        } else {
            res.status(404).json({ "message": "Email nulo" });
        }
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (req.params.ident != null) { //verificando o parâmetro da requisição
        services.delete(req).then(result => {
            if (result == true) {
                res.status(200).json({ "message": "Restaurante excluído com sucesso !" });
            } else {
                res.status(404).json({ "message": result });
            }
        })
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}