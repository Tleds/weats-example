const menus = require('../database/models/Menus_loja');
require('../database/index');

module.exports = {
  async all(id_loja){
    let resposta = await menus.findAll({raw:true,where:{id_loja}})
    .catch(e=>{
      return {"message":e,"result":false}
    })
    if(!resposta){return {"message":"Loja inválida","result":false}}
    return {"message":resposta,"result":true}
  },
  async create(menu){
    const { id_loja,id_classificacao,nome,marca,descricao,preco } = menu
    
    let resposta = await menus.create({
      id_loja,
      id_classificacao,
      nome,
      marca,
      descricao,
      preco
    })
    .catch(e=>{
      return {"message":e,"result":true}
    })

    return {"message":"Menu criado com sucesso","result":true}

  },
  async update(menu){
    const { id,id_loja,id_classificacao,nome,marca,descricao,preco } = menu
    
    let resposta = await menus.update({
      id_loja,
      id_classificacao,
      nome,
      marca,
      descricao,
      preco
    },
   {
    where:{id}
   })
    .catch(e=>{
      return {"message":e,"result":true}
    })

    if(!resposta){return {"message":"Identificador não encontrado","result":true}}

    return {"message":"Menu criado com sucesso","result":true}
  },
  async delete(id){
    let resposta = await menus.destroy({where:{id}})
    .catch(e=>{
      return {"message":e,"result":false}
    })

    if(!resposta){return {"message":"Identificador não encontrado","result":true}}

    return {"message":"Menu excluído com sucesso","result":true}
  },

}