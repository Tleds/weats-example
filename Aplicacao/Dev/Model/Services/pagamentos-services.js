'use-strict'
/*const repository_usuarios = require('../Repository/usuarios-repository');
const repository_restaurantes = require('../Repository/restaurantes-repository');
const repository_mesas = require('../Repository/mesas-repository');
const repository_pedidos = require('../Repository/pedidos-repository');
const repository_formas_pagamento = require('../Repository/formas_pagamento-repository');*/
const repository_pagamentos = require('../Repository/pagamentos-repository');
//Verificar a necessidade
/*
exports.validaUsuario = function(pagamento) {
    repository_usuarios.readById(pagamento.id_usuario).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
exports.validaRestaurante = function(pagamento) {
    repository_restaurantes.readById(pagamento.id_restaurante).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
exports.validaMesa = function(pagamento) {
    repository_mesas.readById(pagamento.id_mesa).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
exports.validaPedido = function(pagamento) {
    repository_pedidos.readById(pagamento.id_pedido).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}
exports.validaFormaPagamento = function(pagamento) {
    repository_formas_pagamento.readById(pagamento.id_forma_pagamento).then(result => {
        if (typeof result != "undefined") {
            return true;
        } else {
            return false;
        }
    });
}*/
exports.create = function(pagamento) {
    return repository_pagamentos.create(pagamento).then(() => {
        return {
            "message": "Pagamento cadastrado com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    })
}
exports.all = function() {
    return repository_pagamentos.all().then(result => {
            return {
                "message": result,
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
exports.put = function(req) {
    return repository_pagamentos.update(req).then(result => {
            return {
                "message": "Pagamento alterado com sucesso",
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
exports.delete = function(req) {
    return repository_pagamentos.delete(req).then(result => {
            return {
                "message": "Pagamento deletado com sucesso",
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