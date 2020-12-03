const ShopFile = require('../Model/database/models/Shop_Files');

class ShopFileController {
  async create(req, res) {
    const { originalName: name, fileName: path } = req.file;
    ShopFile.create({
      name,
      path,
    });
  }
}

module.exports = new ShopFileController();