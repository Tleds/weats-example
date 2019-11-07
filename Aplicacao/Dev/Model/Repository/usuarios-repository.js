const usuarios = require('../Entities/Usuarios');

exports.all = function() {
    return usuarios.findAll({ attributes: ['id', 'nome', 'email', 'telefone', 'cpf'], raw: true });
};

exports.create = function Salvar(usuario) {
    return usuarios.create({
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        telefone: usuario.telefone,
        cpf: usuario.cpf
    });
}
exports.validaEmailUsuario = function verificaEmail(usuario) {
    return usuarios.findAll({ where: { email: usuario.email }, raw: true });
}
exports.verifica_login = function(usuario) {
    return usuarios.findOne({ where: { email: usuario.email, senha: usuario.senha }, attributes: ['id'] });
}
exports.update = function Atualizar(req) {

    var usuario = req.body;
    return usuarios.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    }).then(id => {
        if (typeof id != "undefined") {
            usuarios.update({
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                telefone: usuario.telefone,
                cpf: usuario.cpf
            }, {
                where: { id: id.id }
            });
        }

    });

}
exports.delete = function Deletar(req) {
    return usuarios.destroy({
        where: { id: req.params.ident }
    });
}