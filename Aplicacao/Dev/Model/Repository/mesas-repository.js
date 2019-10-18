const mesas = require('../Entities/Mesas');
const repository_restaurantes = require('./restaurantes-repository');

exports.all = function() {
    return mesas.findAll({ raw: true });
};

exports.create = function Salvar(mesas) {
    return mesas.create({
        id_restaurante: mesas.id_restaurante,
        descricao: mesas.descricao
    })
}
exports.read = function verificaRestaurante(mesas) {
    return mesas.findOne({ where: { id_restaurante: mesas.id_restaurante }, raw: true });
}
exports.update = function Atualizar(req) {
    return mesas.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    }).then(id => {
        if (typeof id != "undefined") {
            mesas.update({
                id_restaurante: mesas.id_restaurante,
                descricao: mesas.descricao
            }, {
                where: { id: id.id }
            })
        } else {
            return { "message": "Identificador não existe" }
        }
    });

}
exports.delete = function Deletar(req) {
    return restaurantes.destroy({
        where: { id_usuario: req.params.ident }
    }).then(() => {
        mesas.destroy({
            where: { id: req.params.ident }
        })
    })
}