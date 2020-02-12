const lojas = require('../database/models/Lojas');
require('../database/index');

module.exports = {
  async all(){

  },
  async readById(id){
    let resposta = await lojas.findByPk(id,{raw:true})
    .catch(e=>{
      return {"message":e,"result":false}
    });

    if(!resposta){return {"message":"Loja não encontrada","result":false}}
    
    return {"message":resposta,"result":true}
  },
  async create(loja){
    const { id_local,cnpj,nome,email,telefone,celular,senha, imagem_loja } = loja;
    let resposta = await lojas.create({ 
      id_local,
      cnpj,
      nome,
      email,
      telefone,
      celular,
      senha, 
      imagem_loja })
    .catch(e=>{
      return {"message":e,"result":false}
    })
    return {"message":"Loja cadastrada com sucesso!","result":true}
  },
  async validaEmail(email){   
    let resposta = await lojas.findOne({raw:true,where:{email},attributes:['email']})
    .catch(e=>{
      return {"message":e,"result":false}
    })
    if(resposta){return {"message":"E-mail já cadastrado","result":false}}
    
    return {"message":"E-mail válido","result":true}
  },
  async validaCNPJ(cnpj){
    let resposta = await lojas.findOne({raw:true, where: { cnpj }, attributes: ['cnpj']})
    .catch(e=>{
      return {"message":e,"result":false}
    })
    if(resposta){return {"message":"CNPJ já cadastrado","result":false}}
    return {"message":"CNPJ válido","result":true}
  },
  async update(loja){
    const { id, id_local,cnpj,nome,email,telefone,celular, imagem_loja } = loja;

    let respostaId = await lojas.findByPk(id)
    .catch(e=>{
      return {"message":e,"result":false}
    })
    
    if(!respostaId){return {"message":"Identificador inválido","result":false}}

    let resposta = await lojas.update({
      id_local,
      cnpj,
      nome,
      email,
      telefone,
      celular, 
      imagem_loja
    },
    {
      where:{id}
    }
    )
    .catch(e=>{
      return {"message":e,"result":false}
    })

    return {"message":"Loja alterada com sucesso","result":true}
  },
  async delete(id){

    let respostaId = await lojas.findByPk(id)
    .catch(e=>{
      return {"message":e,"result":false}
    })
    
    if(!respostaId){return {"message":"Identificador inválido","result":false}}

    let resposta = await lojas.destroy({where:{id}})
    .catch(e=>{
      return {"message":e,"result":false}
    })
    return {"message":"Loja excluída com sucesso","result":true}
  },

}