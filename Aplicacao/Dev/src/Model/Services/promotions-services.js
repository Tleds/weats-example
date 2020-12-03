'use-strict'
const repository_promotions = require('../Repository/promotions-repository')
const utils = require('./functions/services-functions')

module.exports = {
    async all(){
        let response = await repository_promotions.all()
        return response
    },
    async readById(id){
      let response = await repository_promotions.readById(id)
      return response
    },
    async create(promotion) {
      let response = await repository_promotions.create(promotion)
      return response
    },
    async update(promotion) {
      let response = await repository_promotions.update(promotion)
      return response
    },
    async delete(id) {
      let response = await repository_promotions.delete(id)
        return response
    },
}
