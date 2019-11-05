'use-strict'
const repository_user = require('../Repository/usuarios-repository');
const entities = require('../Entities/Usuarios');
const jwt = require('jsonwebtoken');
exports.ValidarEmail = function validaemail(req) {
    return repository_user.validaEmailUsuario(req);
}
exports.verificalogin = function(usuario) {
    return repository_user.verifica_login(usuario).then(function(result) {
        if (result == null) {
            return null;
        } else {
            result = result.id
            let token = jwt.sign({ result }, process.env.SECRET, {
                expiresIn: 600 //10 min
            })
            return { auth: true, "token": token };
        }
    })
}