const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
  async verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    }
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
      req.userId = decoded.id;
      req.userAccess = decoded.id_access;
      return next();
    } catch (e) {
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token.' });
    }
  },
};
