'use-strict'
const repository_pedidos = require('../Model/Repository/pedidos-repository'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const services_pedidos = require('../Model/Services/pedidos-services')


exports.get = (req, res, next) => {
    repository_pedidos.all().then(function(pedido) {
        res.json({ pedido: pedido }); //retorna o json com o pedido
    });
}
exports.post = (req, res, next) => {
    repository_pedidos.create(req.body).then(() => {
        res.status(200).json({ "message": "Menu cadastrado com sucesso" });
    }).catch(error => {
        res.status(404).json({ "message": error });
    })
}
exports.put = (req, res, next) => { //request, responde e next
    if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
        repository_pedidos.update(req).then(() => {
            res.status(200).json({ "message": "Menu atualizado com sucesso !" });
        }).catch(error => {
            res.status(404).json({ "message": error });
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (typeof req.params.ident != "undefined") { //verificando o parâmetro da requisição
        repository_pedidos.delete(req).then(() => {
            res.status(200).json({ "message": "Menu excluído com sucesso !" });
        }).catch(error => {
            res.status(404).json({ "message": error });
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}