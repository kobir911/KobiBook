const jwt = require('jsonwebtoken');

exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: expired,
  });
};
