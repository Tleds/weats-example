const restaurantes = require('../Entities/Restaurantes');
const bc = require('bcrypt');
module.exports = {
    async all(local) {
        let resposta =  await restaurantes.findAll({attributes: ['id', 'nome', 'email', 'cnpj', 'telefone', 'celular', 'avaliacao','imagem_restaurante'],where:{local : local}, raw: true })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if(!resposta){return {"message":"Restaurante não encontrado","result":false}}
        return {"restaurantes":resposta, "result":true}
    },
    async Catalogo() {
        let resposta = await restaurantes.findAll({attributes: ['nome','telefone','imagem_restaurante', 'avaliacao']},{ raw: true })
        .catch(e=>{
            return {"message":e,"result":false,"status":500}
        })
        return {"message":resposta, "result":true,"status":200}
    },
    async VerificaEmail(email) {
        return await restaurantes.findOne({ where: { email: email }, raw: true });
        
    },
    async VerificaCNPJ(cnpj) {
        return await restaurantes.findOne({ where: { cnpj: cnpj }, raw: true });
    },
    async create(restaurante) {
        const {nome,cnpj,email,telefone,celular,senha,local,imagem_restaurante, avaliacao} = restaurante;
        let resposta = await restaurantes.create({nome,cnpj,email,telefone,celular,senha,id_local : local,imagem_restaurante,avaliacao
        })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Restaurante criado com sucesso","result":true,"status":200}
    },
    async readById(id) {
        let resposta = await restaurantes.findByPk(id, {attributes: ['id', 'nome', 'email', 'cnpj', 'telefone', 'celular']})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":resposta,"result":true}
    },
    async update(req) {
        let {nome,cnpj,email,telefone,celular,local} = req.body;
        let id_restaurante = await restaurantes.findOne({where: {id: req.userId},raw: true, attributes:['id']})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if (!id_restaurante.id) {return {"message":"Restaurante não existe","result":false}}
        let resposta = await restaurantes.update({nome,cnpj,email,telefone,celular,id_local:local}, {where: { id: id_restaurante.id }})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        
        return {"message":"Restaurante atualizado com sucesso","result":true}
    },
    async delete(req) {
        const {userId} = req;
        let resposta = await restaurantes.destroy({
            where: { id: req.userId }
        })
        .catch(e=>{
           return {"message":e,"result":false,"status":500} 
        });
        return {"message":"Restaurante deletado com sucesso","result":true,"status":200}
    },
    async verifica_login(restaurante) {
        const {email,senha} = restaurante;
        
        let resposta = await restaurantes.findOne({ where: { email }, attributes: ['id', 'id_access','senha'] })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if(!resposta){return {"message":"Login ou senha inválidos","result":false}}
        
        let result = await bc.compare(senha,resposta.senha);                                                                                                                                                                               
        if(!result){return {"message":"Login ou senha inválidos","result":false}}

        return {"result":true,"id":resposta.id, "id_access":resposta.id_access}
    }
}