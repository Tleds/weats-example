const restaurantes = require('../Entities/Restaurantes');
const repository_enderecos = require('./enderecos-repository');

exports.all = function() {
    return restaurantes.findAll({ raw: true });
};

exports.create = function Salvar(restaurante) {
    return restaurantes.create({
        nome: restaurante.nome,
        cnpj: restaurante.cnpj,
        email: restaurante.email,
        telefone: restaurante.telefone,
        celular: restaurante.celular
    });
}
exports.readById = function(id) {
    return restaurantes.findOne({
        where: { id: id },
        raw: true
    });
}
exports.update = function Atualizar(req) {
    return restaurantes.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    }).then(id => {
        if (typeof id != "undefined") {
            restaurantes.update({
                nome: restaurante.nome,
                cnpj: restaurante.cnpj,
                email: restaurante.email,
                telefone: restaurante.telefone,
                celular: restaurante.celular
            }, {
                where: { id: id.id }
            });
        }

    });

}
exports.delete = function Deletar(req) {
    return restaurantes.destroy({
        where: { id: req.params.ident }
    });
}