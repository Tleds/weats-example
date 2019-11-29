'use-strict'
const services_usuarios = require('../Model/Services/usuarios-services');
const validate = require('./functions/validate-functions')


module.exports= {
    async getId(req, res, next){
        let dados = await services_usuarios.ReadById(req.userId);
        if(!dados.result) {res.status(500).json({dados}); return}
        res.status(200).json(dados);
        return
    },
    async get(req, res, next){
        if(req.userAcces == 10){res.status(403).json({ "auth": false, "message": "Acesso negado" });}
        
        let dados = await services_usuarios.all();
        if(!dados.result) {res.status(500).json({dados}); return}
        
        res.status(500).json(error);
        return
    },
    async post(req, res, next){
        let usuario = req.body;
        if (!validate.verificaNuloUsuario(usuario)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" }); return}
        
        let email = await services_usuarios.ValidarEmail(usuario);
        if(email == false) {return res.status(400).json({"message":"Email já cadastrado", "result":false}) ;return}
        
        let cpf = await services_usuarios.validarcpf(usuario.cpf);
        if(cpf == false) {return res.status(400).json({"message":"Cpf inválido","result":false}); return}
        
        let resposta = await services_usuarios.create(usuario);   
        console.log(!resposta.result);     
        if(!resposta.result){res.status(500).json({"message":"Erro ao cadastrar o usuário","result":false,resposta}); return}

        res.status(200).json({"message":"Usuario cadastrado com sucesso","result":true, resposta})
        return
    },
    async put(req, res, next){ //request, responde e next
        let usuario = req.body;
        if (!req.userId) {res.status(400).json({ "message": "Identificador inválido" }); return}
        if (!validate.verificaNuloUsuario(usuario)) {res.status(500).json({ "message": "Erro : O atributo não pode ser nulo" }); return}
        if (await services_usuarios.validarcpf(usuario.cpf)) {res.status(400).json({ "message": "CPF inválido" }); return}
        let alt = await services_usuarios.update(req);
        if(!alt.result){res.status(500).json(alt); return}
        res.status(200).json({"message":"Usuário alterado com sucesso", "result":true});
        return
    },
    async delete(req, res, next) { //request, responde e next   
        if (!req.userId) {res.status(400).json({ "message": "Identificador inválido" });return}
    
        let result = await services_usuarios.delete(req);
        if(!result){res.status(500).json(result);return}    
        
        res.status(200).json(result);
    }
}

