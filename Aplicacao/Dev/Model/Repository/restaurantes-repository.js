const restaurantes = require('../Entities/Restaurantes');

exports.all = function(local) {
    return restaurantes.findAll({where:{local : local}, raw: true });
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
        celular: restaurante.celular,
        senha: restaurante.senha,
        local: restaurante.local
    });
}
exports.readById = function(id) {
    return restaurantes.findByPk(id, {attributes: ['id', 'nome', 'email', 'cnpj', 'telefone', 'celular']});
}
exports.update = function Atualizar(req) {
    let restaurante = req.body;
    return restaurantes.findOne({
        where: {
            id: req.userId
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
        where: { id: req.userId }
    });
}
exports.verifica_login = function(restaurante) {
    return restaurantes.findOne({ where: { email: restaurante.email, senha: restaurante.senha }, attributes: ['id', 'id_access'] });
}