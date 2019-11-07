const pedidos = require('../Entities/Pedidos');


exports.all = function() {
    return pedidos.findAll({ raw: true });
};
exports.create = function Salvar(pedido) {
    return pedidos.create({
        id_restaurante: pedido.id_restaurante,
        id_mesa: pedido.id_mesa,
        id_usuario: pedido.id_usuario,
        produto: pedido.produto,
        descricao_produto: pedido.descricao_produto,
        tipo_produto: pedido.tipo_produto,
        quantidade: pedido.quantidade,
        preco_pedido: pedido.preco_pedido
    })
}
exports.update = function Atualizar(req) {
    var pedido = req.body
    return pedidos.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    }).then(id => {
        if (typeof id != "undefined") {
            pedidos.update({
                id_restaurante: pedido.id_restaurante,
                id_mesa: pedido.id_mesa,
                id_usuario: pedido.id_usuario,
                produto: pedido.produto,
                descricao_produto: pedido.descricao_produto,
                tipo_produto: pedido.tipo_produto,
                quantidade: pedido.quantidade,
                preco_pedido: pedido.preco_pedido,
            }, {
                where: { id: id.id }
            });

        }
    })
}
exports.delete = function Deletar(req) {
    return pedidos.destroy({
        where: { id: req.params.ident }
    })
}