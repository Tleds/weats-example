'use-strict'
/*const repository_usuarios = require('../Repository/usuarios-repository');
const repository_restaurantes = require('../Repository/restaurantes-repository');
const repository_mesas = require('../Repository/mesas-repository');
const repository_pedidos = require('../Repository/pedidos-repository');
const repository_formas_pagamento = require('../Repository/formas_pagamento-repository');*/
const repository_pagamentos = require('../Repository/pagamento_estacionamento-repository');
//Verificar a necessidade
/*
async validaUsuario = function(pagamento) {
    repository_usuarios.readById(pagamento.id_usuario).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
async validaRestaurante = function(pagamento) {
    repository_restaurantes.readById(pagamento.id_restaurante).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
async validaMesa = function(pagamento) {
    repository_mesas.readById(pagamento.id_mesa).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
async validaPedido = function(pagamento) {
    repository_pedidos.readById(pagamento.id_pedido).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
async validaFormaPagamento = function(pagamento) {
    repository_formas_pagamento.readById(pagamento.id_forma_pagamento).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}*/
module.exports = {
    async create(pagamento) {
        let resposta = await repository_pagamentos.create(pagamento);
        return resposta;
    },
    async all(id) {
        let resposta = await repository_pagamentos.all();
        return resposta;
    },
    async put(req) {
        let resposta = await repository_pagamentos.update(req);
        return resposta;
    },
    async delete(req) {
        let resposta = await repository_pagamentos.delete(req);
        return resposta;
    }
}