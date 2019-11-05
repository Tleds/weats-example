'use-strict'
const repository_user = require('../Repository/usuarios-repository');
const entities = require('../Entities/Usuarios');

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
                expiresIn: 6000 //10 min
            })
            return { auth: true, "token": token };
        }
    })
}
exports.validacpf = function(cpf) {
    var Soma;
    var Resto;
    Soma = 0;
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