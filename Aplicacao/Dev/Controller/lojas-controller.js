'use-strict'
const services_lojas = require('../Model/Services/lojas-services'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const validate = require('./functions/validate-functions');

module.exports = {
  async get(req,res,next){
    let loja = req.body;

    let resposta = await services_lojas.readById(loja.id);

    if(!resposta.result){return res.status(500).json(resposta)}

    res.status(200).json(resposta);
    return
  },
  async post(req,res,next){
    let loja = req.body;

    let cnpj = validate.verificaCNPJ(loja.cnpj);
    if(!cnpj){return res.status(400).json({"message":"CNPJ inválido", "result":false})}

    cnpj = await services_lojas.validaCNPJ(loja.cnpj);
    if(!cnpj.result){return res.status(400).json({"message":"CNPJ já cadastrado", "result":false})}

    let email = validate.verificaEmail(loja.email);
    if(!email){return res.status(400).json({"message":"E-mail inválido", "result":false})}

    email = await services_lojas.validaEmail(loja.email);
    if(!email.result){return res.status(400).json({"message":"E-mail já cadastrado", "result":false})}

    let resposta = await services_lojas.create(loja);
    if(!resposta.result){return res.status(500).json(resposta)}

    res.status(200).json(resposta);
    return
  },
  async put(req,res,next){
    let loja = req.body;
    //Pegando o Id da loja
    loja.id = req.userId;

    let cnpj = validate.verificaCNPJ(loja.cnpj);
    if(!cnpj){return res.status(400).json({"message":"CNPJ inválido", "result":false})}
    
    let resposta = await services_lojas.update(loja);
    
    if(!resposta.result){return res.status(500).json(resposta)}
    
    res.status(200).json(resposta);
    return
  },
  async delete(req,res,next){
    let loja = req.body;
    //Pegando o Id da loja
    loja.id = req.userId;
    
    let resposta = await services_lojas.delete(loja.id);

    if(!resposta.result){return res.status(500).json(resposta)}

    res.status(200).json(resposta);
    return

  },
}