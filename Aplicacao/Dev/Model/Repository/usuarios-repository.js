const usuarios = require('../database/models/Usuarios');
//const usuarios = require('../Entities/Usuarios');
const bc = require('bcrypt');
require('../database/index');

module.exports = {
    async all() {
        let dados = await usuarios.findAll({ attributes: ['id', 'nome', 'email', 'telefone', 'cpf'], raw: true })
        .catch(e=>{
            return {"result":false, "message":e}
        });
        return {"result":true, "message":dados.dataValues}
    },
    async create(usuario) {
        const {nome,email,senha,telefone,cpf} = usuario;
        let resposta = await usuarios.create({nome,email,senha,telefone,cpf})
        .catch(e=>{
            return {"message":e, "result":false}
        });
        return {"message":resposta,"result":true}
    },
    async validaEmailUsuario(usuario) {
        const {email}=usuario;
        return await usuarios.findOne({ where: { email }, raw: true });
    },
    async verifica_login(usuario) {
        const {email, senha} = usuario
        let comp = await usuarios.findOne({ where: { email }, attributes: ['id', 'id_access', 'senha'] })
        .catch(e=>{
            return {"message":e,'result':false}
        })
        if(!comp){return {"result":false}}
        
        let result = await bc.compare(String(senha),String(comp.senha));
        if(!result){return {"result":false}}
        
        return {"result":true, "id":comp.id, "id_access":comp.id_access}
    },
    async update(req) {
        const {nome, email, telefone, cpf} = req.body;
        return usuarios.findOne({where: {id: req.userId},raw: true})
        .then(id => {
            if (id) {
            usuarios.update({nome,email,telefone,cpf},{where: { id: id.id }});}
        }).catch(e=>{
            return {"message":"Erro ao atualizar o usuário","error":e}
        });
    },
    async validaCpf(cpf){
        return usuarios.findOne({where:{cpf},raw:true});
    },
    async ReadById(id) {
        let resposta = await usuarios.findByPk(id, {attributes: ['id', 'nome', 'email', 'telefone', 'cpf']})
        .catch(e=>{
            return {"result":false, "message":e}
        })
        if(!resposta){return {"result":false,"message":"Usuário não existe"}}
        return {"result":true, "message":resposta.dataValues}
    },
    async delete(req) {
        const {userId} = req;
        let resposta = await usuarios.destroy({where: { id:userId }})
        .catch(e=>{
            return {"result":false,"message":e}
        })
        if(!resposta){return {"result":false,"message":"Usuário não existe"}}
        
        return {"result":true, "message":"Usuário deletado com sucesso"}
    }
}
