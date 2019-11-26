'use-strict'
const repository_mesas = require('../Repository/mesas-repository');
const qr_code = require('qrcode');
const ct = require('../Repository/criptografia');
const services_functions = require('./functions/services-functions')

exports.all = function(req) {
    return repository_mesas.all(req).then(result => {
            return {
                "message": result,
                "result": true
            };
        })
        .catch(error => {
            return {
                "message": error,
                "result": false
            };
        })
}
exports.create = function(mesa) {
    return repository_mesas.create(mesa).then(result => {
            return {
                "message": "Mesa cadastrada com sucesso",
                "result": true
            };
        })
        .catch(error => {
            return {
                "message": error,
                "result": false
            };
        })
}
exports.update = function(req) {
    return repository_mesas.update(req).then(result => {
            return {
                "message": "Mesa alterada com sucesso",
                "result": true
            };
        })
        .catch(error => {
            return {
                "message": error,
                "result": false
            };
        })
}
exports.delete = function(req) {
    return repository_mesas.delete(req).then(result => {
            return {
                "message": "Mesa deletada com sucesso",
                "result": true
            };
        })
        .catch(error => {
            return {
                "message": error,
                "result": false
            };
        })
}
exports.GerarPdf = function (dados){
    dados = ct.cp(dados);
    return qr_code.toDataURL(dados).then(result =>{
        let resposta = services_functions.GerarPdf(result);
            if(!resposta){
                return {"result":true};
            } else{
                return {"result":false};
            }
    })
    .catch(e=>{
        return e + "teste";
    })
}