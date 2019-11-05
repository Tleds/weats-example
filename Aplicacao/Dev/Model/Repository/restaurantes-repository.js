const restaurantes = require('../Entities/Restaurantes');
const repository_enderecos = require('./enderecos-repository');

exports.all = function() {
    return restaurantes.findAll({ raw: true });
};
exports.VerificaEmail = function(restaurante) {
    return restaurantes.count({ where: { email: restaurante.email }, raw: true });
}
exports.VerificaCNPJ = function(restaurante) {
    return restaurantes.count({ where: { cnpj: restaurante.cnpj }, raw: true });
}
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
    return restaurantes.findByPk(id);
}
exports.update = function Atualizar(req) {
    let restaurante = req.body;
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