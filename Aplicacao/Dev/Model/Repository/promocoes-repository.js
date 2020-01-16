const promocoes = require('../database/models/Promocoes');
require('../database/index');

module.exports = {
    async all(){
      // let resposta = await promocoes.findAll({raw:true,
      //   attributes:['id','id_restaurante','id_local','data_inicio','data_fim','cupom','descricao','titulo_promocao']
      //   ,include:['restaurantes','locals']})
      let resposta = await promocoes.sequelize.query('SELECT PR.id,PR.titulo_promocao,'
      +'PR.descricao,PR.data_inicio,PR.data_fim,'
      +'RE.imagem_restaurante,RE.nome,lo.nome from promocoes as PR '
      +'INNER JOIN restaurantes as RE ON PR.id_restaurante = RE.id '
      +'INNER JOIN locals as lo ON PR.id_local = lo.id;',
      { type: promocoes.sequelize.QueryTypes.SELECT})
      .catch(e=>{
        return {"message":e,"result":false}
      });
      return {"message":resposta,"result":true};
    },
    async ReadById(id) {
      let resposta = await promocoes.findByPk(id,{raw:true,
        attributes:['id','id_restaurante','id_local','data_inicio','data_fim','cupom','descricao','titulo_promocao']})
      .catch(e=>{
        return {"message":e,"result":false}
      });
      if(!resposta){return {"message":"Identificador não encontrado","result":false}};
      return {"message":resposta,"result":true};
    },
    async create(promocao) {
      const {id_restaurante,id_local,data_inicio,data_fim,cupom,descricao,titulo_promocao} = promocao;
      let resposta = await promocoes.create({
        id_restaurante,id_local,data_inicio,data_fim,cupom,descricao,titulo_promocao
      })
      .catch(e=>{
        return {"message":e,"result":false}
      });
      return {"message":"Promoção cadastrada com sucesso","result":true}
    },
    async update(req) {
      const { id_restaurante,id_local,data_inicio,data_fim,cupom,descricao,titulo_promocao} = req.body;
      const { id } = req.params;
      let id_promocao = await promocoes.findByPk(id,{raw:true,attributes:['id']})
      .catch(e=>{ 
        return {"message":e,"result":false}
      });
      if(!id_promocao){return {"message":"Identificador não encontrado","result":false}}
      let resposta = await promocoes.update({
        id_restaurante,id_local,data_inicio,data_fim,cupom,descricao, titulo_promocao
      }, {where:{id}})
      .catch(e=>{
        return {"message":e,"result":false}
      });
      return {"message":"Promoção atualizada com sucesso","result":true}
    },
    async delete(id) {
       let resposta = await promocoes.destroy({where:{id}})
       .catch(e=>{
         return {"message":e,"result":false}
       });
       return {"message":"Promoção excluída com sucesso","result":true}
    }
}
