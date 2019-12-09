'use-strict'
/*const repository_usuario = require('../Repository/usuarios-repository');
const repository_restaurantes = require('../Repository/restaurantes-repository');
const repository_mesas = require('../Repository/mesas-repository');*/
const repository_pedidos = require('../Repository/pedidos-repository');
//Verificar a necessidade
/*
async  validaUsuario = function(pedido) {
    repository_usuario.readById(pedido.id_usuario).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
async  validaRestaurante = function(menu) {
    repository_restaurantes.readById(menu.id_restaurante).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
async  validaMesa = function(pedido) {
    repository_mesas.readById(pedido.id_mesa).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
*/
module.exports = {
    async ReadById(id) {
        let resposta = await repository_pedidos.ReadById(id);
        return resposta;
    },
    async  create(pedido) {
        let resposta = await repository_pedidos.create(pedido);
        return resposta;
    },
    async  update(pedido) {
        let resposta = await repository_pedidos.update(pedido)
        return resposta;
    },
    async delete(id_pedido) {
        let resposta = await repository_pedidos.delete(id_pedido);
        return resposta;
    }
}