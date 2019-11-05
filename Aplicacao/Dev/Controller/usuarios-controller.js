'use-strict'
const repository_usuarios = require('../Model/Repository/usuarios-repository'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const services_usuarios = require('../Model/Services/usuarios-services');


exports.get = (req, res, next) => {
    repository_usuarios.all().then(user => {
        res.json(user); //retorna o json com os usuários
    });
}
exports.post = (req, res, next) => {
    services_usuarios.ValidarEmail(req.body).then(email => {
        if (typeof email[0] != "undefined") {
            res.status(404).json({ "message": "E-mail já cadastrado" });
        }
        if (typeof email[0] == "undefined") {
            services_usuarios.validacpf(req.body.cpf)
            if (services_usuarios.validacpf(req.body.cpf)) {
                repository_usuarios.create(req.body).then(result => {
                    res.status(200).json(result);
                }).catch(error => {
                    res.status(404).json(error);
                });
            } else {
                res.status(404).json({ "message": "CPF inválido" });
            }
        }
    });
}
exports.put = (req, res, next) => { //request, responde e next
    if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
        services_usuarios.ValidarEmail(req.body).then(email => {
            if (typeof email[0] != "undefined") {
                res.status(404).json({ "message": "E-mail já cadastrado" });
            }
            if (typeof email[0] == "undefined") {
                services_usuarios.validarcpf(req.body.cpf).then(cpf => {
                    if (cpf) {
                        repository_usuarios.update(req).then(result => {
                            res.status(200).json(result);
                        }).catch(error => {
                            res.status(404).json(error);
                        });
                    } else {
                        res.status(404).json({ "message": "CPF inválido" });
                    }
                });
            }
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (typeof req.params.ident != "undefined") { //verificando o parâmetro da requisição
        repository_usuarios.delete(req).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(error);
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}