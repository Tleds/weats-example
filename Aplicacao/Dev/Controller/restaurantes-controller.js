'use-strict'
const services_restaurantes = require('../Model/Services/restaurantes-services');
const validate = require('./functions/validate-functions');

module.exports = {
    //Vem da API de conexão
    async getShopping(req, res, next){
        
        if (req.userAccess == 0 && req.userAccess == 10) {res.status(403).json({ "auth": false, "message": "Acesso negado" });}
        
        let resposta = await services_restaurantes.all(req.headers.local);
        if(!resposta.result){res.status(500).json(resposta);return}

        res.json({ "id_mesa":req.headers.id_mesa, "restaurantes":resposta.restaurantes }); //retorna o json com os usuários
        return;
    },
    //Vem da API de restaurantes
    async  getId(req, res, next){
        if (req.userAccess != 1 && req.userAccess != 10) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        
        let resposta = await services_restaurantes.ReadById(req.userId);
        if(!resposta.result){res.status(500).json(resposta);return}

        res.json(resposta); //retorna o json com os usuários
        return
    },
    async  post(req, res, next){
        let restaurante = req.body;
        if (!validate.verificaNuloRestaurantes(restaurante)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });return}
        //Valida se o email confere
        let email = validate.verificaEmail(restaurante.email);
        if(!email){res.status(400).json({ "message": "E-mail inválido","result":false });return}
        //Verifica se o email existe no banco de dados
        email = await services_restaurantes.validaEmailRestaurante(restaurante.email);
        if (!email) {res.status(400).json({ "message": "E-mail já cadastrado","result":false });return}
        //Valida se o CNPJ confere
        let cnpj = validate.verificaCNPJ(restaurante.cnpj);
        if(!cnpj){res.status(400).json({ "message": "CNPJ inválido","result":false });return}
        //Verifica se o CNPJ já está no banco de dados
        cnpj = await services_restaurantes.validaCnpjRestaurante(restaurante.cnpj);
        if (!cnpj) {res.status(400).json({ "message": "CNPJ já cadastrado","result":false });return}

        let resposta = await services_restaurantes.create(req.body);
        if(resposta.result){res.status(500).json(resposta); return}
        res.status(200).json(resposta);
        return
    },
    async  put(req, res, next){ //request, responde e next
        let restaurante = req.body;
        restaurante.senha = '0';
        if (!req.userId) { res.status(403).json({ "message": "Identificador inválido","result":false });return}//verificando o parâmetro da requisição
        
        if (!validate.verificaNuloRestaurantes(restaurante)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });return}
        
        let cnpj = await services_restaurantes.validaCnpjRestaurante(restaurante.cnpj)
        if (!cnpj) {res.status(400).json({ "message": "CNPJ inválido" });return}
        
        let resposta = await services_restaurantes.update(req);
        if(!resposta.result){res.status(500).json(resposta);return}
        
        res.status(200).json(resposta);
        return;
    },
    async  delete(req, res, next){ //request, responde e next   
        if (!req.userId) {res.status(403).json({ "message": "Identificador inválido" });return}
        
        let resposta = await services_restaurantes.delete(req);
        if(!resposta.result){res.status(500).json(resposta);return}
                
        res.status(500).json(resposta);
        return
    }
}
