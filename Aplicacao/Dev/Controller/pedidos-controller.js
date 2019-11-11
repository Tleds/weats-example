'use-strict'

const services_pedidos = require('../Model/Services/pedidos-services')

function verificaNulo(pedido) {
    if (pedido.id_restaurante != "" &&
        pedido.id_mesa != "" &&
        pedido.id_usuario != "" &&
        pedido.produto != "" &&
        pedido.descricao_produto != "" &&
        pedido.tipo_produto != "" &&
        pedido.quantidade != "" &&
        pedido.preco_pedido != "") {
        if (typeof pedido.id_restaurante != "undefined" &&
            typeof pedido.id_mesa != "undefined" &&
            typeof pedido.id_usuario != "undefined" &&
            typeof pedido.produto != "undefined" &&
            typeof pedido.descricao_produto != "undefined" &&
            typeof pedido.tipo_produto != "undefined" &&
            typeof pedido.quantidade != "undefined" &&
            typeof pedido.preco_pedido != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}

exports.get = (req, res, next) => {
    services_pedidos.all().then(result => {
        res.json(result); //retorna o json com o pedido
    })

}
exports.post = (req, res, next) => {
    if (req.userAccess == 0) {
        if (verificaNulo(pedido)) {
            services_pedidos.create(req.body).then(result => {
                    res.status(200).json(result);
                })
                .catch(error => {
                    res.status(404).json(error);
                })
        } else {
            res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" });
        }
    } else {
        res.status(404).json({ "auth": true, "message": "Acesso negado" });
    }
}
exports.put = (req, res, next) => { //request, responde e next
    if (req.userAccess == 0) {
        if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
            if (verificaNulo(pedido)) {
                services_pedidos.update(req).then(result => {
                        res.status(200).json(result);
                    })
                    .catch(error => {
                        res.status(404).json(error);
                    })
            } else {
                res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" });
            }
        } else {
            res.status(404).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(404).json({ "auth": true, "message": "Acesso negado" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next  
    if (req.userAccess == 0) {
        if (typeof req.params.ident != "undefined") { //verificando o parâmetro da requisição
            services_pedidos.delete(req).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(404).json(error);
            });
        } else {
            res.status(404).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(404).json({ "auth": true, "message": "Acesso negado" });
    }
}