'use-strict'

const services_pedidos = require('../Model/Services/pedidos-services')


exports.get = (req, res, next) => {
    services_pedidos.all().then(result => {
        res.json(result); //retorna o json com o pedido
    })

}
exports.post = (req, res, next) => {

    services_pedidos.create(req.body).then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404).json(error);
        })
}
exports.put = (req, res, next) => { //request, responde e next
    if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
        services_pedidos.update(req).then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(404).json(error);
            })
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (typeof req.params.ident != "undefined") { //verificando o parâmetro da requisição
        services_pedidos.delete(req).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(error);
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}