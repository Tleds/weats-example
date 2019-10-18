'use-strict'
const repository_restaurantes = require('../Repository/repository-restaurantes');

exports.validarEndereco = function(endereco) {
    repository_restaurantes.readById(endereco.id_restaurante).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
};