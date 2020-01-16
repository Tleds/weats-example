const avaliacao_restaurante = require('../database/models/avaliacao_restaurante');
require('../database/index');

module.exports = {
  async all(){
    let resposta = await avaliacao_restaurante.findAll({raw:true})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    if(!resposta){return {"message":"Restaurante não encontrado","result":false}}
    return {"message":resposta,"result":true}
  },
  async ReadById(){
    const {id_restaurante} = restaurante
    let resposta = await avaliacao_restaurante.findAll({where:{id_restaurante},raw:true})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    if(!resposta){return {"message":"Restaurante não encontrado","result":false}}
    return {"message":resposta,"result":true}
  },
  async create(restaurante){
    const {id_restaurante,id_usuario,descricao} = restaurante;
    let resposta = await avaliacao_restaurante.create({id_restaurante,id_usuario,descricao})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    return {"message":"Avaliação do restaurante registrada com sucesso","result":true}
  },
  async update(restaurante){
    const {id,id_restaurante,id_usuario,descricao} = restaurante;
    
    let id_resposta = await avaliacao_restaurante.findOne({where:id_restaurante})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    if(!id_resposta){return {"message":"Restaurante não encontrado","result":false}};

    let resposta = await avaliacao_restaurante.update({id_restaurante,id_usuario,descricao},
      {where:{id}})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    return {"message":"Avaliação do restaurante ataualizada com sucesso","result":true}
  },
  async delete(restaurante){
    const {id} = restaurante;
    await avaliacao_restaurante.destroy({where:{id}})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    return {"message":"Avaliacao do restaurante excluída com sucesso","result":true}
  },
}