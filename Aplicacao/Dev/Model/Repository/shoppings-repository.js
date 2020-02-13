const shoppings = require('../database/models/Shoppings');
require('../database/index');

module.exports = {
    async all(local) {
        let resposta =  await shoppings.findAll({attributes: ['id','nome','latitude','longitude'], raw: true })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if(!resposta){return {"message":"Shopping não encontrado","result":false}}
        return {"message":resposta, "result":true}
    },
    async create(shopping) {
        const {nome, latitude,longitude} = restaurante;
        let resposta = await shoppings.create({nome, latitude,longitude})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Shopping criado com sucesso","result":true,"status":200}
    },
    async update(req) {
        let {nome,cnpj,email,telefone,celular,local} = req.body;
        let id_restaurante = await shoppings.findOne({where: {id: req.userId},raw: true, attributes:['id']})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if (!id_restaurante.id) {return {"message":"Shopping não existe","result":false}}
        let resposta = await shoppings.update({nome,cnpj,email,telefone,celular,id_local:local}, {where: { id: id_restaurante.id }})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        
        return {"message":"Shopping atualizado com sucesso","result":true}
    },
    async delete(req) {
        const {userId} = req;
        let resposta = await shoppings.destroy({
            where: { id: req.userId }
        })
        .catch(e=>{
           return {"message":e,"result":false,"status":500} 
        });
        return {"message":"Shopping deletado com sucesso","result":true,"status":200}
    }
}