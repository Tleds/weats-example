const pedidos = require('../Entities/Pedidos');

module.exports = {
    async ReadById(id) {
        let resposta = await pedidos.findAll({ where:{id_usuario:id},raw: true, attributes:
        ['id','id_restaurante','id_mesa','id_usuario','produto','quantidade','observacao','id_status','preco_pedido'] })
        .catch(e=>{
            return {"message":e,"result":false}
        })
        if(!resposta){return {"message":"Pedido não existe","result":false}}
         
        return {"message":resposta, "result":true}
    },
    async create(pedido) {
        const {id_restaurante, id_mesa, id_usuario, produto, quantidade, preco_pedido, observacao, senha} = pedido;
        let resultado =  pedidos.create({
            id_restaurante,
            id_mesa,
            id_usuario,
            produto,
            quantidade,
            preco_pedido,
            observacao,
            senha
        })
        .catch(e=>{
            return {"message":e,"result":false}
        })
        
        return {"message":"Pedido cadastrado com sucesso","result":true}
    },
    async update(pedido) {
        const {id_mesa,id_restaurante,produto,quantidade,preco_pedido,id_pedido,id_status,id_usuario,observacao} = pedido;
        let id = await pedidos.findOne({where: {id: id_pedido},raw: true})
        .catch(e=>{
            return {"message":e,"result":false}
        });
        if (!id) {return {"message":"Pedido não encontrado","result":false};}
        let resposta = await pedidos.update({
                id_restaurante,
                id_mesa,
                id_usuario,
                produto,
                quantidade,
                id_status,
                preco_pedido,
                observacao
            }, {where: { id: id.id }})
            .catch(e=>{
                return {"message":e,"result":false}
            });
        return {"message":"Pedido alterado com sucesso","result":true}
    },
    async delete(id_pedido) {
        let resposta = await pedidos.destroy({
            where: { id: id_pedido }
        })
        .catch(e=>{
            return {"message":e,"result":false}
        });
        return {"message":"Pedido deletado com sucesso", "result":true}
    }
}
