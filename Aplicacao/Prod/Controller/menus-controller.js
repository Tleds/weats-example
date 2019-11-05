'use-strict'
const services_menus = require('../Model/Services/menus-services'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const jwt = require('./jwt-authentication');
exports.get = jwt.verifyJWT, (req, res, next) => {
    services_menus.all().then(result => {
        res.status(200).json(result);
    }).catch(result => {
        res.status(404).json(result)
    })
}
exports.post = /*jwt.verifyJWT,*/ (req, res, next) => {
    let menu = req.body;
    if (services_menus.validaRestaurante(menu)) {
        services_menus.create(menu).then(result => {
            res.status(200).json(result);
        }).catch(result => {
            res.status(404).json(result);
        })
    }
}
exports.put = jwt.verifyJWT, (req, res, next) => { //request, responde e next
    if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
        repository_menus.update(req).then(() => {
            res.status(200).json({ "message": "Menu atualizado com sucesso !" });
        }).catch(error => {
            res.status(404).json({ "message": error });
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}
exports.delete = jwt.verifyJWT, (req, res, next) => { //request, responde e next   
    if (typeof req.params.ident != "undefined") { //verificando o parâmetro da requisição
        repository_menus.delete(req).then(() => {
            res.status(200).json({ "message": "Menu excluído com sucesso !" });
        }).catch(error => {
            res.status(404).json({ "message": error });
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}