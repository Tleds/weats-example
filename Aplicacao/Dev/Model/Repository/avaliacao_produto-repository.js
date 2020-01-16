const avaliacao_produto = require('../database/models/avaliacao_produtos');
require('../database/index');


module.exports = {
  async all(restaurante){
    let resposta = await avaliacao_produto.findAll({raw:true})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    if(!resposta){return {"message":"Produto não encontrado","result":false}}
    return {"message":resposta,"result":true}
  },
  async ReadById(){
    const {id_produto} = restaurante
    let resposta = await avaliacao_produto.findAll({where:{id_produto},raw:true})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    if(!resposta){return {"message":"Produto não encontrado","result":false}}
    return {"message":resposta,"result":true}
  },
  async create(restaurante){
    const {id_produto,id_restaurante,id_usuario,descricao} = restaurante;
    let resposta = await avaliacao_produto.create({id_produto,id_restaurante,id_usuario,descricao})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    return {"message":"Avaliação do produto registrada com sucesso","result":true}
  },
  async update(restaurante){
    const {id,id_produto, id_restaurante,id_usuario,descricao} = restaurante;
    
    let id_resposta = await avaliacao_produto.findOne({where:id_produto})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    if(!id_resposta){return {"message":"Produto não encontrado","result":false}};

    let resposta = await avaliacao_produto.update({id_produto,id_restaurante,id_usuario,descricao},
      {where:{id}})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    return {"message":"Avaliação do produto ataualizada com sucesso","result":true}
  },
  async delete(restaurante){
    const {id} = restaurante;
    await avaliacao_produto.destroy({where:{id}})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    return {"message":"Avaliacao do produto excluída com sucesso","result":true}
  },
}