'use-strict'
const repository_user = require('../Model/Repository/usuarios-repository'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const services = require('../Model/Services/usuarios-services');


exports.get = (req, res, next) => {
    repository_user.all().then(function(user) {
        res.json({ user: user }); //retorna o json com os usuários
    });
}
exports.post = (req, res, next) => {
    services.ValidarEmail(req.body).then(email => {
        if (typeof email[0] != "undefined") {
            res.status(404).json({ "message": "E-mail já cadastrado" });
        }
        if (typeof email[0] == "undefined") {
            services.validacpf(req.body).then(cpf => {
                if (cpf) {
                    repository_user.create(req.body).then(() => {
                        res.status(200).json({ "message": "Usuário cadastrado com sucesso" });
                    }).catch(error => {
                        res.status(404).json({ "message": error });
                    });
                } else {
                    res.status(404).json({ "message": "CPF inválido" });
                }
            });
        }
    });
}
exports.put = (req, res, next) => { //request, responde e next
    if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
        services.ValidarEmail(req.body).then(email => {
            if (typeof email[0] != "undefined") {
                res.status(404).json({ "message": "E-mail já cadastrado" });
            }
            if (typeof email[0] == "undefined") {
                services.validarcpf(req.body.cpf).then(cpf => {
                    if (cpf) {
                        repository_user.update(req).then(() => {
                            res.status(200).json({ "message": "Usuário atualizado com sucesso !" });
                        }).catch(error => {
                            res.status(404).json({ "message": error });
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
        repository_user.delete(req).then(() => {
            res.status(200).json({ "message": "Usuário excluído com sucesso !" });
        }).catch(error => {
            res.status(404).json({ "message": error });
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}