const Tables = require('../Model/database/models/Tables');

class ShowShopTablesController {
  async showTables(req, res, next) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Invalid user' });
    }
    const response = await Tables.findAll({
      raw: true,
      where: { id_shop: req.userId },
    });

    return res.status(200).json({ tables: Object.values(response) });
  }
}

module.exports = new ShowShopTablesController();
