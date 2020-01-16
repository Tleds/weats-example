const menus = require('../database/models/Menus');
require('../database/index');

module.exports = {
    async all(req) {
        const {id_restaurante} = req.headers;
        let resposta = await menus.findAll({where:{id_restaurante}, raw: true ,attributes:['id',  'id_restaurante','produto','secao','preco','descricao_produto','tipo_produto','imagem_produto']})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if(!resposta){return {"message":"Restaurante inválido","result":false}}
        return {"message":resposta,"result":true}
    },
    async create(menu) {
        const {id_restaurante,produto,secao,preco,descricao_produto,tipo_produto,imagem_produto} = menu;
        let resposta = await menus.create({id_restaurante,produto,secao,preco,descricao_produto,tipo_produto,imagem_produto})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Menu criado com sucesso","result":true}
    },
    async update(req) {
        const {id_restaurante,produto,secao,preco,descricao_produto,tipo_produto,imagem_produto} = req.body;
        
        let id = await menus.findOne({where: {id: req.body.id_menu},raw: true})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if(!id){return {"message":"Menu não encontrado","result":false}}
        
        let resposta = await menus.update({id_restaurante,produto,secao,preco,descricao_produto,tipo_produto,imagem_produto}, 
        {where: { id: id.id }})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Menu alterado com sucesso","result":true}
    },
    async delete(req) {
        let resposta = await menus.destroy({where: { id: req.body.id_menu }})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Menu deletado com sucesso","result":true}
    }
}