const pagamentos = require('../Entities/Pagamentos');

module.exports = {

    async all() {
        let reposta = pagamentos.findAll({ raw: true })
        .catch(e=>{
            return {"message":e,"result":false};
        });
        if(!resposta){return }
        return {"message":resposta, "result":true};
    },
    async create(pagamento) {
        return pagamentos.create({
            id_forma_pagamento: pagamento.id_forma_pagamento,
            id_usuario: pagamento.id_usuario,
            id_restaurante: pagamento.id_restaurante,
            id_mesa: pagamento.id_mesa,
            id_pedido: pagamento.id_pedido,
            preco_final: pagamento.preco_final
        })
    },
    async read(pagamento) {
        return pagamentos.findAll({ where: { id_usuario: pgamanto.id_usuario }, raw: true });
    },
    async update(req) {
        var pagamento = req.body
        return pagamentos.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        }).then(id => {
            if (typeof id != "undefined") {
                pagamentos.update({
                    id_forma_pagamento: pagamento.id_forma_pagamento,
                    id_usuario: pagamento.id_usuario,
                    id_restaurante: pagamento.id_restaurante,
                    id_mesa: pagamento.id_mesa,
                    id_pedido: pagamento.id_pedido,
                    preco_final: pagamento.preco_final
                }, {
                    where: { id: id.id }
                })
            }
        });
    
    },
    async delete(req) {
        return pagamentos.destroy({
            where: { id: req.params.ident }
        });
    }
}