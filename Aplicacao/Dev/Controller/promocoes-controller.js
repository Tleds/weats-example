'use-strict'

const services_promocoes = require('../Model/Services/promocoes-services');
const validate = require('./functions/validate-functions');

module.exports = {
    async get (req, res, next){
      let resposta = await services_promocoes.all();
      
      return res.json(resposta);
    },    
    async post(req, res, next){
      let promocao = req.body;
      // if (req.userAccess != 1) {res.status(403).json({ "auth": true, "message": "Acesso negado" });return}
      
      let resposta = await services_promocoes.create(promocao);
      
      return res.json(resposta);
    },
    async put(req, res, next){ //request, responde e next
      if (req.userAccess != 1) {res.status(403).json({ "auth": true, "message": "Acesso negado" });return}
      let resposta = await services_promocoes.update(req);

      return res.json(resposta);
    },
    async delete(req, res, next){ //request, responde e next  
      // if (req.userAccess != 1) {res.status(403).json({ "auth": true, "message": "Acesso negado" });return}
      let resposta = await services_promocoes.delete(req.params.id);
      
      return res.json(resposta);
    }
}
