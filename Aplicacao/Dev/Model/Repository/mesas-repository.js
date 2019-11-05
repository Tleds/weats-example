const mesas = require('../Entities/Mesas');

exports.all = function() {
    return mesas.findAll({ raw: true });
};

exports.create = function Salvar(mesa) {
    return mesas.create({
            id_restaurante: mesa.id_restaurante,
            descricao: mesa.descricao
        })
        .catch(error => {
            return error;
        })
}
exports.read = function verificaRestaurante(mesa) {
    return mesas.findOne({ where: { id_restaurante: mesa.id_restaurante }, raw: true });
}
exports.update = function Atualizar(req) {
    let mesa = req.body;
    return mesas.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    }).then(id => {
        if (typeof id != "undefined") {
            mesas.update({
                id_restaurante: mesa.id_restaurante,
                descricao: mesa.descricao
            }, {
                where: { id: id.id }
            })
        } else {
            return { "message": "Identificador não existe" }
        }
    });

}
exports.delete = function Deletar(req) {
    return mesas.destroy({
        where: { id: req.params.ident }
    })
}