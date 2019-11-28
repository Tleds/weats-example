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
        quantidade: pedido.quantidade,
        preco_pedido: pedido.preco_pedido,
        observacao : pedido.observacao
    })
}
exports.update = function Atualizar(pedido) {
    const {id_mesa,id_restaurante,produto,quantidade,preco_pedido,id_pedido,id_status,id_usuario,observacao} = pedido;
    return pedidos.findOne({
        where: {
            id: id_pedido
        },
        raw: true
    }).then(id => {
        if (!id) {return false;}
        pedidos.update({
            id_restaurante,
            id_mesa,
            id_usuario,
            produto,
            quantidade,
            id_status,
            preco_pedido,
            observacao
        }, {
            where: { id: id.id }
        });
        return true;
    })
}
exports.delete = function Deletar(req) {
    return pedidos.destroy({
        where: { id: req.userId }
    })
}