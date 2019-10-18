const pagamentos = require('../Entities/Pagamentos');
const repository_usuarios = require('./usuarios-repository');
const repository_restaurantes = require('./restaurantes-repository');
const repository_mesas = require('./mesas-repository');
const repository_pedidos = require('./pedidos-repository');
const repository_forma_pagamento = require('./formas_pagamento-repository');

exports.all = function() {
    return pagamentos.findAll({ raw: true });
};

exports.create = function Salvar(pagamento) {
    return pagamentos.create({
        id_forma_pagamento: pagamento.id_forma_pagamento,
        id_usuario: pagamento.id_usuario,
        id_restaurante: pagamento.id_restaurante,
        id_mesa: pagamento.id_mesa,
        id_pedido: pagamento.id_pedido,
        preco_final: pagamento.preco_final
    })
}
exports.read = function verificaEmail(pagamento) {
    return pagamentos.findAll({ where: { id_usuario: pgamanto.id_usuario }, raw: true });
}
exports.update = function Atualizar(req) {
    var pagamento = req.body
    return pagamentos.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    }).then(id => {
        if (typeof id != "undefined") {
            pagamentos.update({
                id_forma_pagamento: pagamento.id_forma_pagamento,
                id_usuario: pagamento.id_usuario,
                id_restaurante: pagamento.id_restaurante,
                id_mesa: pagamento.id_mesa,
                id_pedido: pagamento.id_pedido,
                preco_final: pagamento.preco_final
            }, {
                where: { id: id.id }
            })
        }
    });

}
exports.delete = function Deletar(req) {
    return pagamentos.destroy({
        where: { id: req.params.ident }
    });
}