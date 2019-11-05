'use-strict'
const repository_restaurantes = require('../Repository/restaurantes-repository');
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
        return true;
    }).catch(error => {
        return error;
    });
}
exports.atualiza = function(req) {
    return repository_restaurantes.update(req).then(() => {
        return true;
    }).catch(error => {
        return error
    });
}
exports.delete = function(req) {
    return repository_restaurantes.delete(req).then(() => {
        return true;
    }).catch(error => {
        return error;
    });
}