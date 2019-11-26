'use-strict'
const services_usuarios = require('../Model/Services/usuarios-services');
const validate = require('./functions/validate-functions')

exports.getId = (req, res, next) => {
    services_usuarios.ReadById(req.userId).then(user => {
            if(user.result === true){
                res.status(200).json(user); //retorna o json com os usuários
            }else{
                res.status(404).json(user); //retorna o json com os usuários
            }
            
        })
        .catch(error => {
            res.status(404).json(error);
        })
}
exports.get = (req, res, next) => {
    services_usuarios.all().then(user => {
            res.status(200).json(user); //retorna o json com os usuários
        })
        .catch(error => {
            res.status(404).json(error);
        })
}
exports.post = (req, res, next) => {
    let usuario = req.body;
    if (validate.verificaNuloUsuario(usuario)) {
        services_usuarios.ValidarEmail(usuario).then(email => {
            if (typeof email[0] != "undefined") {
                res.status(404).json({ "message": "E-mail já cadastrado" });
            }
            if (typeof email[0] == "undefined") {
                if (services_usuarios.validarcpf(usuario.cpf)) {
                    services_usuarios.create(usuario).then(result => {
                        res.status(200).json(result);
                    }).catch(error => {
                        res.status(404).json(error);
                    });
                } else {
                    res.status(404).json({ "message": "CPF inválido" });
                }
            }
        });
    } else {
        res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" });
    }
}
exports.put = (req, res, next) => { //request, responde e next
    let usuario = req.body;
    if (typeof req.userId != "undefined") { //verificando o parâmetro da requisição
        if (validate.verificaNuloUsuario(usuario)) {
            if (services_usuarios.validarcpf(usuario.cpf)) {
                services_usuarios.update(req).then(result => {
                    res.status(200).json(result);
                }).catch(error => {
                    res.status(404).json(error);
                });
            } else {
                res.status(404).json({ "message": "CPF inválido" });
            }
        } else {
            res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" });
        }
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (typeof req.userId != "undefined") { //verificando o parâmetro da requisição
        services_usuarios.delete(req).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(error);
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}