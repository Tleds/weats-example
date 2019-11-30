const restaurantes = require('../Entities/Restaurantes');

module.exports = {
    async all(local) {
        return await restaurantes.findAll({where:{local : local}, raw: true });
    },
    async Catalogo() {
        let resposta = await restaurantes.findAll({attributes: ['nome','telefone','imagem_restaurante', 'avaliacao']},{ raw: true })
        .catch(e=>{
            return {"message":e,"result":false}
        })
        console.log(resposta)
        return {"message":resposta, "result":true}
    },
    async VerificaEmail(restaurante) {
        return restaurantes.count({ where: { email: restaurante.email }, raw: true });
    },
    async VerificaCNPJ(restaurante) {
        return restaurantes.count({ where: { cnpj: restaurante.cnpj }, raw: true });
    },
    async create(restaurante) {
        return restaurantes.create({
            nome: restaurante.nome,
            cnpj: restaurante.cnpj,
            email: restaurante.email,
            telefone: restaurante.telefone,
            celular: restaurante.celular,
            senha: restaurante.senha,
            local: restaurante.local
        });
    },
    async readById(id) {
        return restaurantes.findByPk(id, {attributes: ['id', 'nome', 'email', 'cnpj', 'telefone', 'celular']});
    },
    async update(req) {
        let restaurante = req.body;
        return restaurantes.findOne({
            where: {
                id: req.userId
            },
            raw: true
        }).then(id => {
            if (typeof id != "undefined") {
                restaurantes.update({
                    nome: restaurante.nome,
                    cnpj: restaurante.cnpj,
                    email: restaurante.email,
                    telefone: restaurante.telefone,
                    celular: restaurante.celular
                }, {
                    where: { id: id.id }
                });
            }
    
        });
    
    },
    async delete(req) {
        return restaurantes.destroy({
            where: { id: req.userId }
        });
    },
    async verifica_login(restaurante) {
        return restaurantes.findOne({ where: { email: restaurante.email, senha: restaurante.senha }, attributes: ['id', 'id_access'] });
    }
}