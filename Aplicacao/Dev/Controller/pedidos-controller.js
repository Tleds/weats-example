'use-strict'

const services_pedidos = require('../Model/Services/pedidos-services')
const validate = require('./functions/validate-functions')


exports.get = (req, res, next) => {
    services_pedidos.all().then(result => {
        res.json(result); //retorna o json com o pedido
    })
}

exports.post = (req, res, next) => {
    req.body.id_usuario = req.userId;
    let pedido = req.body;
    if (req.userAccess == 0) {
        if (validate.verificaNuloPedido(pedido)) {
            services_pedidos.create(req.body).then(result => {
                    res.status(200).json(result);
                })
                .catch(error => {
                    res.status(500).json(error);
                })
        } else {
            res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });
        }
    } else {
        res.status(403).json({ "auth": true, "message": "Acesso negado" });
    }
}
exports.put = (req, res, next) => { //request, responde e next
    req.body.id_usuario = req.userId;
    let pedido = req.body;
    if (req.userAccess == 0) {
        if (typeof req.userId != "undefined") { //verificando o parâmetro da requisição
            if (validate.verificaNuloPedido(pedido)) {
                services_pedidos.update(req).then(result => {
                        res.status(200).json(result);
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    })
            } else {
                res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });
            }
        } else {
            res.status(400).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(403).json({ "auth": true, "message": "Acesso negado" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next  
    if (req.userAccess == 0) {
        if (typeof req.userId != "undefined") { //verificando o parâmetro da requisição
            services_pedidos.delete(req).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json(error);
            });
        } else {
            res.status(400).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(403).json({ "auth": true, "message": "Acesso negado" });
    }
}