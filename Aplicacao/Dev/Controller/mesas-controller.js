'use-strict'
const services_mesas = require('../Model/Services/mesas-services');
const validate = require('./functions/validate-functions')

exports.get = (req, res, next) => {
    if (req.userAccess == 0 || req.userAccess == 1 || req.userAccess == 10) {
        services_mesas.all(req).then(function(mesas) {
                res.status(200).json(mesas); //retorna o json com as mesas
            })
            .catch(error => {
                res.status(404).json(error); //retorna o json com as mesas
            })
    } else {
        res.status(500).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.post = (req, res, next) => {
    let dados = {"restaurante" : 1,"tipo" : 2,"local":1,"mesa":11};
    services_mesas.GerarPdf(JSON.stringify(dados)).then(result=>{
        if(result.result === true){
            res.status(200).json({"message":"Pdf Gerado com sucesso"});
        }
        if(result.result === false){
            res.status(500).json({"Erro":"Erro ao gerar o pdf"});
        }
    })
    /*
    if(resposta.result === true){
        res.status(200).json({"message":"Pdf gerado com sucesso", resposta});
    } else{
        res.status(500).json({"Error":"Erro ao gerar o pdf",resposta});
    }*/
    /*if (req.userAccess == 1 || req.userAccess == 10) {
        let mesa = req.body;
        if (validate.verificaNuloMesa(mesa)) {
            services_mesas.create(mesa).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(404).json(error);
            });
        } else {
            res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" });
        }
    } else {
        res.status(500).json({ "auth": false, "message": "Acesso negado" });
    }*/
}
exports.put = (req, res, next) => { //request, responde e next
    if (req.userAccess == 1 || req.userAccess == 10) {
        if (typeof req.params.id != "undefined") { //verificando o parâmetro da requisição
            if (validate.verificaNuloMesa(mesa)) {
                services_mesas.update(req).then(result => {
                    res.status(200).json(result);
                }).catch(error => {
                    res.status(404).json(error);
                });
            } else {
                res.status(404).json({ "message": "Erro : O atributo não pode ser nulo" });
            }
        } else {
            res.status(404).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(500).json({ "auth": false, "message": "Acesso negado" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (req.userAccess == 1 || req.userAccess == 10) {
        if (typeof req.params.ident != "undefined") { //verificando o parâmetro da requisição
            services_mesas.delete(req).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(404).json(error);
            });
        } else {
            res.status(404).json({ "message": "Identificador inválido" });
        }
    } else {
        res.status(500).json({ "auth": false, "message": "Acesso negado" });
    }
}