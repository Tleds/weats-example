const repository_shop_rating = require('../Repository/shops_rating-repository')
const validate = require('./functions/services-functions')

module.exports = {
  async all(){
    let response = await repository_shop_rating.all()
    return response
  },
  async readById(id){
    let response = await repository_shop_rating.readById(id)
    return response
  },
  async create(shop_rating){
    let response = await repository_shop_rating.create(shop_rating)
    return response
  },
  async update(shop_rating){
    let response = await repository_shop_rating.update(shop_rating)
    return response
  },
  async delete(id){
    let response = await repository_shop_rating.delete(id)
    return response
  },
}