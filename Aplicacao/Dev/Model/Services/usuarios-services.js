'use-strict'
const repository_usuarios = require('../Repository/usuarios-repository');
const jwt = require('jsonwebtoken');
const validate = require('./functions/services-functions');
const cp = require('../Repository/criptografia');
const bc = require('bcrypt');

module.exports = {
    async validarcpf(cpf){
        let resposta = await repository_usuarios.validaCpf(cpf);
        if(!resposta){return true}
        return false;
    },
    async ValidarEmail(req) {
        let usuarios = await repository_usuarios.validaEmailUsuario(req);
        if(!usuarios) {return true}
        return false;
    },
    async create(usuario) {
        usuario.senha = await bc.hash(usuario.senha, await bc.genSalt(10));
        let resposta= await repository_usuarios.create(usuario);
        return resposta;
    },
    async update(req) {
        let resposta = await repository_usuarios.update(req);
        if(!resposta.error) {return true}
        return {"result":false, "Error" : resposta.error};
    },
    async verificalogin(usuario) {
        let resultado = await repository_usuarios.verifica_login(usuario);
        if(!resultado.result){return false}
        result = {"id":resultado.id,"id_access":resultado.id_access};
        let token = jwt.sign({ result }, process.env.SECRET, {expiresIn: 1440})//24H}
        return { "token": token, "result":true};
    },
    async ReadById(usuario){
        let resposta = await repository_usuarios.ReadById(usuario);
        return resposta
    },
    async all() {
        let resposta = await repository_usuarios.all();
        return resposta
    },
    async delete(req) {
        let resposta = await repository_usuarios.delete(req);
        if(!resposta.result){return { "message": resposta, "result": false }}
            
        return { "message": "Usuario deletado com sucesso", "result": true }
            
    }
}
