'use-strict'
const repository_usuario = require('../Repository/usuarios-repository');
const repository_restaurantes = require('../Repository/restaurantes-repository');
const repository_mesas = require('../Repository/mesas-repository');
const repository_pedidos = require('../Repository/pedidos-repository');
//Verificar a necessidade
/*
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
*/
exports.all = function(pedido) {
    return repository_pedidos.all().then(pedido => {
            return {
                "message": pedido,
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
exports.create = function(pedido) {
    return repository_pedidos.create(pedido).then(result => {
        return {
            "message": "Pedido cadastrado com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    })
}
exports.update = function(req) {
    return repository_pedidos.update(req).then(result => {
        return {
            "message": "Pedido alterado com sucesso",
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
    return repository_pedidos.delete(req).then(result => {
        return {
            "message": "Pedido deletado com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    });
}