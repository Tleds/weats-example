const services_avaliacao_restaurante = require('../Model/Services/avaliacao_restaurante-services');

module.exports = {
  async get(req,res,next){
    let restaurante = req.headers.id_restaurante;
    let resposta = await services_avaliacao_restaurante.all(restaurante);

    if(!resposta.result){res.status(500).json(resposta);return}
    return res.status(200).json(resposta);
  },
  async post(req,res,next){
    let restaurante = req.body;
    let resposta = await services_avaliacao_restaurante.create(restaurante);

    if(!resposta.result){res.status(500).json(resposta);return}
    return res.status(200).json(resposta);
  },
  async put(req,res,next){
    let restaurante = req.body;
    let resposta = await services_avaliacao_restaurante.update(restaurante);

    if(!resposta.result){res.status(500).json(resposta);return}
    return res.status(200).json(resposta);
  },
  async delete(req,res,next){
    let restaurante = req.body;
    let resposta = await services_avaliacao_restaurante.delete(restaurante);

    if(!resposta.result){res.status(500).json(resposta);return}
    return res.status(200).json(resposta);
  },
}