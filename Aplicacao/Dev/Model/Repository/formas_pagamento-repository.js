const formas_pagamento = require('../database/models/Formas_pagamento');
require('../database/index');

module.exports={

    async all() {
        let resposta = await formas_pagamento.findAll({ raw: true })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if(!resposta){return{"message":"Formas de pagamento não encontradas","result":false}}
        return {"message":resposta,"resposta":true}
    },
    
    async readById(id) {
        let resposta = await formas_pagamento.findOne({where: { id: id, raw: true }})
        .catch(e=>{
            return{"message":e,"result":false}
        });
        if(!resposta){return{"message":"Forma de pagamento não encontrada","result":false}}
        return {"message":resposta,"result":true}
    },
    async create(forma_pagamento) {
        const {descricao,tipo_forma_pagamento,bandeira} = forma_pagamento
        let resposta = await formas_pagamento.create({descricao,tipo_forma_pagamento,bandeira})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Forma de pagamento criado com sucesso", "result":true}
    },
    async update(req) {
        const {descricao,tipo_forma_pagamento,bandeira} = req.body
        let id = await formas_pagamento.findOne({where: {id: req.body.id_forma_pagamento},raw: true})
        .catch(e=>{
            return {"message":e,"result":false}
        })
        if(!id){return {"message":"Forma de pagamento não encontrada","result":true}}
        
        let resposta = await formas_pagamento.update({descricao,tipo_forma_pagamento,bandeira}, 
        {where: { id: id.id }})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Forma de pagamento alterada com sucesso","result":true}
    },
    async delete(req) {
        let resposta = await formas_pagamento.destroy({where: { id: req.body.id_forma_pagamento }})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Forma de pagamento excluída com sucesso","result":true}
    }
}