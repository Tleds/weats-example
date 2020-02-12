'use-strict'
const services_menus_loja = require('../Model/Services/menus_loja-services'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const validate = require('./functions/validate-functions')

module.exports = {
    async get(req, res, next){
      let resposta = await services_menus_loja.all(req.params.id_loja);

      if(!resposta.result){return res.status(500).json(resposta)}

      res.status(200).json(resposta);
      return
    },
    async post(req, res, next){
      let menu = req.body;
      req.userId = 6;
      menu.id_loja = req.userId;

      let resposta = await services_menus_loja.create(menu);

      if(!resposta.result){return res.status(500).json(resposta)}
      
      res.status(200).json(resposta);
      return
    },
    async put(req, res, next){ //request, responde e next
      let menu = req.body;
      req.userId = 6;
      menu.id_loja = req.userId;
      
      let resposta = await services_menus_loja.update(menu);

      if(!resposta.result){return res.status(500).json(resposta)}
      
      res.status(200).json(resposta);
      return
    },
    async delete(req, res, next){ 
      let menu = req.body;
      
      let resposta = await services_menus_loja.delete(menu.id);
      
      if(!resposta.result){return res.status(500).json(resposta)}
      
      res.status(200).json(resposta);
      return
    }
}