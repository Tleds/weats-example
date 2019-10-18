const formas_pagamento = require('../Entities/Formas_pagamento');

exports.all = function() {
    return formas_pagamento.findAll({ raw: true });
};

exports.readById = function(id) {
        return formas_pagamento.findOne({
            where: { id: id, raw: true }
        });
    }
    /*
    exports.update = function Atualizar(req) {
        let forma_pagamento = req.body;
        return formas_pagamento.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        }).then(id => {
            if (typeof id != "undefined") {
                formas_pagamento.update({
                    descricao: forma_pagamento.descricao,
                    tipo_forma_pagamento: forma_pagamento.tipo_forma_pagamento,
                    bandeira: forma_pagamento.bandeira
                }, {
                    where: { id: id.id }
                });
            }

        });

    }
    exports.delete = function Deletar(req) {
        return formas_pagamento.destroy({
            where: { id: req.params.ident }
        });
    }*/