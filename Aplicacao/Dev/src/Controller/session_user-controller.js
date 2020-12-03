const Users = require('../Model/database/models/Users');

class SessionUserController {
  async createSession(req, res, next) {
    const { email, password } = req.body;
    const response = await Users.findOne({
      where: { email },
      attributes: ['id', 'id_access', 'password_hash'],
    }).catch((e) => {
      return res.status(500).json({ message: e });
    });
    if (!response) {
      return res.status(400).json({ message: 'Incorrect email' });
    }
    if (!(await response.checkPassword(password))) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    return res
      .status(200)
      .json({ message: 'Authenticated user', token: response.generateToken() });
  }
}

module.exports = new SessionUserController();
