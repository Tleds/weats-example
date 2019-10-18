'use-strict'
const repository_usuario = require('../Repository/usuarios-repository');
const repository_restaurantes = require('../Repository/restaurantes-repository');
const repository_mesas = require('../Repository/mesas-repository');

exports.validaUsuario = function(pedido) {
    repository_usuario.readById(pedido.id_usuario).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
exports.validaRestaurante = function(menu) {
    repository_restaurantes.readById(menu.id_restaurante).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
exports.validaMesa = function(pedido) {
    repository_mesas.readById(pedido.id_mesa).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}