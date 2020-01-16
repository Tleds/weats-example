const pagamentos = require('../database/models/Pagamentos');
require('../database/index');

module.exports = {
    async all() {
        let reposta = await pagamentos.findAll({ raw: true ,attributes:["id",
        "id_forma_pagamento","id_usuario","id_restaurante","id_mesa","id_pedido","preco_final"]})
        .catch(e=>{
            return {"message":e,"result":false};
        });
        if(!resposta){return {"message":"Pagamentos não encontrados","result":false}}
        return {"message":resposta, "result":true};
    },
    async create(pagamento) {
        let resposta = await pagamentos.create({
            id_forma_pagamento: pagamento.id_forma_pagamento,
            id_usuario: pagamento.id_usuario,
            id_restaurante: pagamento.id_restaurante,
            id_mesa: pagamento.id_mesa,
            id_pedido: pagamento.id_pedido,
            preco_final: pagamento.preco_final
        })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Pagamento registrado com sucesso!","result":true}
    },
    async read(pagamento) {
        const {id_usuario} = pagamento
        let resposta = await pagamentos.findAll({ where: { id_usuario }, raw: true })
        .catch(e=>{
            return {"message":e,"result":false}
        })
        if(!resposta){return {"message":"Pagamento não encontrado","result":false}}
        return {"message":resposta,"result":true}
    },
    async update(req) {
        const {id_forma_pagamento,id_usuario,id_restaurante,id_mesa,id_pedido,preco_final} = req.body
        let id = await pagamentos.findOne({where: {id: req.body.id_pagamento},raw: true,attributes:['id']})
        .catch(e=>{
            return {"message":e,"result":false}
        });

        if(!id){return {"message":"Identificador inválido","result":false}}

        let resposta = await pagamentos.update({
            id_forma_pagamento,
            id_usuario,
            id_restaurante,
            id_mesa,
            id_pedido,
            preco_final
        }, {
            where: { id: id.id }
        })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Pagamento alterado com sucesso","result":true}
    },
    async delete(req) {
        let resposta = await pagamentos.destroy({
            where: { id: req.params.ident }
        })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Pagamento excluído com sucesso","result":false}
    }
}