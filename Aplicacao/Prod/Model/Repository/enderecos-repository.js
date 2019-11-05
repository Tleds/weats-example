const endereco = require('../Entities/Enderecos');

exports.all = function() {
    return enderecos.findAll({ raw: true });
};

exports.create = function Salvar(req) {
    var endereco = req.body
    return enderecos.create({
        id_restaurante: endereco.id_restaurante,
        endereco: endereco.rua,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        cep: endereco.cep,
        uf: endereco.uf,
        pais: enderecos.pais,
        localizacao: enderecos.localizacao
    })
}
exports.update = function Atualizar(req) {
    let endereco = req.body
    return enderecos.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    }).then(id => {
        if (typeof id != "undefined") {
            enderecos.update({
                id_restaurante: endereco.id_restaurante,
                endereco: endereco.rua,
                numero: endereco.numero,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                cep: endereco.cep,
                uf: endereco.uf,
                pais: enderecos.pais,
                localizacao: enderecos.localizacao
            }, { where: { id: id.id } })
        }
    });
}
exports.delete = function Deletar(req) {
    return enderecos.destroy({
        where: { id: req.params.ident }
    });
}