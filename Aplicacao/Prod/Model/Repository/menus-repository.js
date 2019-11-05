const menus = require('../Entities/Menus');
const repository_restaurantes = require('./restaurantes-repository');

exports.all = function() {
    return menus.findAll({ raw: true });
};

exports.create = function Salvar(req) {
    let menu = req.body;
    return menus.create({
        id_restaurante: menu.id_restaurante,
        produto: menu.produto,
        sessao: menu.sessao,
        preco: menu.preco,
        descricao_produto: menu.descricao_produto,
        tipo_produto: menu.tipo_produto,
        imagem_produto: menu.imagem_produto
    })

}

exports.update = function Atualizar(req) {
    let menu = req.body
    return menus.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    }).then(id => {
        if (typeof id != "undefined") {
            menus.update({
                id_restaurante: menu.id_restaurante,
                produto: menu.produto,
                sessao: menu.sessao,
                preco: menu.preco,
                descricao_produto: menu.descricao_produto,
                tipo_produto: menu.tipo_produto,
                imagem_produto: menu.imagem_produto
            }, {
                where: { id: id.id }
            })
        }
    })

}
exports.delete = function Deletar(req) {
    return menus.destroy({
        where: { id: req.params.ident }
    })
}