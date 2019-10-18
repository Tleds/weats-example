'use-strict'
const repository_restaurantes = require('../Repository/restaurantes-repository');
exports.validaCnpjRestaurante = function(restaurante) {
    repository_restaurantes.VerificaCNPJ(restaurante.cnpj).then(result => {
        if (typeof result == "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
exports.validaEmailRestaurante = function(restaurante) {
    repository_restaurantes.VerificaEmail(restaurante.email).then(result => {
        if (typeof result == "undefined") {
            return true;
        } else {
            return false;
        }
    });
}