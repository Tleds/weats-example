const enderecos = require('../database/models/Enderecos');
require('../database/index');

module.exports = {
    async all() {
        let resposta = await enderecos.findAll({ raw: true })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":resposta,"result":true}
    },
    async ReadById(id_restaurante){
        let resposta = await enderecos.findAll({where:{id_restaurante},raw:true})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if(!resposta){return {"message":"Restaurante inválido","result":false}}
        return {"message":resposta,"result":true}
    },
    async create(req) {
        const {id_restaurante,endereco,numero,bairro,cidade,cep,uf,pais,localizacao} = req.body.endereco
        
        let resposta = await enderecos.create({id_restaurante,endereco,numero,bairro,cidade,cep,uf,pais,localizacao})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Endereço criado com sucesso","result":true}
    },
    async update(req) {
        let {id_endereco, id_restaurante,endereco,numero,bairro,cidade,cep,uf,pais,localizacao} = req.body.endereco
        let id = await enderecos.findOne({where: {id: id_endereco},raw: true})
        .catch(e=>{
            return {"message":e,"result":true}
        });
        if(!id){return {"message":"Endereco não encontrado","result":false}}
        let resposta = await enderecos.update({id_restaurante,endereco,numero,bairro,cidade,cep,uf,pais,localizacao}, { where: { id: id.id } })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Endereço alterado com sucesso","result":true}
    },
    async delete(req) {
        let resposta = await enderecos.destroy({where: { id: req.params.ident }})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Endereço excluído com sucesso","result":true}
    }
}