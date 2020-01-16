const mesas = require('../database/models/Mesas');
require('../database/index');

module.exports = {
    async all(id) {
        let resposta = await mesas.findAll({where:{ id_restaurante : id}},{ raw: true, attributes:['id','descricao'] })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if(!resposta){return {"message":"Restaurante inválido","result":false}}
        return {"message":resposta,"result":true}
    },
    async create(mesa) {
        let resposta = await mesas.create({
            id_restaurante: mesa.id_restaurante,
            descricao: mesa.descricao
        })
        .catch(e => {
            return {"message":e,"result":false};
        });
        return {"message":"Mesa cadastrada com sucesso","result":true, "id_mesa":resposta.dataValues.id}
    },
    //Verificar necessidade
    async read(mesa) {
        return mesas.findOne({ where: { id_restaurante: mesa.id_restaurante }, raw: true });
    },
    //Verificar necessidade
    async update(req) {
        const {id_restaurante,id_mesa,descricao} = req.body;
        
        let id = await mesas.findOne({where: {id_mesa},raw: true});
        if (!id) {return { "message": "Identificador não existe","result":false}}
        
        let resposta = await mesas.update({id_restaurante,descricao}, 
        {where: { id: id.id }})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Mesa atualizada com sucesso","result":true}
                
    },
    async delete(id_mesa) {
        let resposta =  mesas.destroy({
            where: { id:id_mesa }
        })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Mesa deletada com sucesso","result":true}
    }
}