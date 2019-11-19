'use-strict'
const repository_restaurantes = require('../Repository/restaurantes-repository');
const jwt = require('jsonwebtoken');

exports.validaCnpjRestaurante = function(restaurante) {
    return repository_restaurantes.VerificaCNPJ(restaurante).then(result => {
        return result;
    });
}
exports.validaEmailRestaurante = function(restaurante) {
    return repository_restaurantes.VerificaEmail(restaurante).then(result => {
        return result;
    });
}
exports.create = function(restaurante) {
    return repository_restaurantes.create(restaurante).then(() => {
        return {
            "message": "Restaurante cadastrado com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    });
}
exports.atualiza = function(req) {
    return repository_restaurantes.update(req).then(() => {
        return {
            "message": "Restaurante alterado com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    });
}
exports.delete = function(req) {
    return repository_restaurantes.delete(req).then(() => {
        return {
            "message": "Restaurante deletado com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    });
}
exports.verificaLogin = function(restaurante){
    return repository_restaurantes.verifica_login(restaurante).then(result => {
        if(result != null)
        {
            result = result.dataValues
            let token = jwt.sign({ result }, process.env.SECRET, {
                expiresIn: 1440 //24H
            })
            return { "token": token, "result":true};
        }else{
            return {"result":""};
        }
        })
        .catch(error => {
            return {"error":error, "result":false};
        })
}
