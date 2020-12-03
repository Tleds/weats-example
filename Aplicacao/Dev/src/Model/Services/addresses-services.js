'use-strict'
const repository_addresses = require('../Repository/addresses-repository')

module.exports = {
    async validateAddress(addresses) {
        let response = await repository_addresses.readById(addresses)
        return response
    },
    async all(){
        let response = await repository_addresses.all()
        return response
    },
    async readById(id){
        let response = await repository_addresses.readById(id)
        return response
    },
    async create(addresses){
        let response = await repository_addresses.create(addresses)
        return response
    },
    async update(addresses){
        let response = await repository_addresses.update(addresses)
        return response
    },
    async delete(id){
        let response = await repository_addresses.delete(id)
        return response
    }
}