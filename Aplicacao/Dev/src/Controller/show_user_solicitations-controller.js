const services_users = require('../Model/Services/users-services');
const Solicitations = require('../Model/database/models/Solicitations');
const SolicitationItems = require('../Model/database/models/Solicitation_items');

class ShowUserSolicitationsController {
  async showSolicitations(req, res, next) {
    const id = req.userId;

    const response = await Solicitations.findAll({
      where: { id_user: id },
      raw: true,
      attributes: [
        'price',
        'solicitation_password',
        'id_shop',
        'id_user',
        'id_table',
        'id_solicitation_status',
      ],
    }).catch((e) => {
      res.status(500).json({ message: 'Internal server error' });
    });

    await response.map(async (solicitation) => {
      solicitation.solicitation_items = await SolicitationItems.findAll({
        where: { id_solicitation: solicitation.id },
        raw: true,
      }).catch((e) => {
        return res.status(500).json({ message: 'Internal server error' });
      });
    });

    return res.status(200).json({ data: response });
  }
}

module.exports = new ShowUserSolicitationsController();
