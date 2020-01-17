'use-strict'
const services_lista_pedidos = require('../Model/Services/lista_pedidos-services');


module.exports = {
    async get(req, res, next){
      let resposta = await services_lista_pedidos.listaPedidos(req.userId);
      if(!resposta.result){return res.status(500).json(resposta)};

      return res.status(200).json(resposta);
    },
}
