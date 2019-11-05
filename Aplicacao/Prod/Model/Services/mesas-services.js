'use-strict'
const repository_restaurantes = require('../Repository/repository-restaurantes');

exports.validarMesa = function(mesa) {
    repository_restaurantes.readById(mesa.id_restaurante).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
};