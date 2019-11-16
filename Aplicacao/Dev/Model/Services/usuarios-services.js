'use-strict'
const repository_usuarios = require('../Repository/usuarios-repository');
const jwt = require('jsonwebtoken');

exports.ValidarEmail = function validaemail(req) {
    return repository_usuarios.validaEmailUsuario(req);
}
exports.verificalogin = function(usuario) {
    return repository_usuarios.verifica_login(usuario).then(result => {
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
exports.validarcpf = function(cpf) {
    var Soma;
    var Resto;
    Soma = 0;
    cpf = cpf.substring(0, 11);
    if (cpf == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
}
exports.all = function() {
    return repository_usuarios.all().then(user => {
            return { "message": user, "result": true }
        })
        .catch(error => {
            return { "message": error, "result": false }
        })
}
exports.create = function(usuario) {
    return repository_usuarios.create(usuario).then(() => {
            return { "message": "Usuario cadastrado com sucesso", "result": true }
        })
        .catch(error => {
            return { "message": error, "result": false }
        })
}
exports.update = function(req) {
    return repository_usuarios.update(req).then(() => {
            return { "message": "Usuario alterado com sucesso", "result": true }
        })
        .catch(error => {
            return { "message": error, "result": false }
        })
}
exports.delete = function(req) {
    return repository_usuarios.delete(req).then(() => {
            return { "message": "Usuario deletado com sucesso", "result": true }
        })
        .catch(error => {
            return { "message": error, "result": false }
        })
}
exports.ReadById = function (usuario){
    return repository_usuarios.ReadById(usuario).then(user => {
            return { "message": user, "result": true }
        })
        .catch(error => {
            return { "message": error, "result": false }
        })
}