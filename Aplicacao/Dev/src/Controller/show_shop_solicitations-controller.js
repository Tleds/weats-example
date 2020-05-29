const Solicitations = require('../Model/database/models/Solicitations');
const SolicitationItems = require('../Model/database/models/Solicitation_items');

class ShowShopSolicitationsController {
  async showSolicitations(req, res, next) {
    if (!req.userId) {
      return res.status(400).json({ message: 'Invalid user' });
    }
    const response = await Solicitations.findAll({
      where: { id_shop: req.userId },
      attributes: [
        'price',
        'solicitation_password',
        'id_shop',
        'id_user',
        'id_table',
        'id_solicitation_status',
      ],
      raw: true,
    }).catch((e) => {
      return res.status(500).json({ message: 'Internal server error' });
    });

    await response.map(async (item) => {
      item.solicitation_items = await SolicitationItems.findAll({
        where: { id_solicitation: item.id },
        raw: true,
      }).catch((e) => {
        return res.status(500).json({ message: 'Internal server error' });
      });
    });

    return res.status(200).json({ data: response });
  }
}

module.exports = new ShowShopSolicitationsController();
