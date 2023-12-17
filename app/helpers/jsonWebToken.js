const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.TOKEN_SECRET;

const jwtOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (user) => {
  const token = jwt.sign(user, secretKey, jwtOptions);

  return token;
};

const verifyToken = (token) => {
  token = token.replace('Bearer ', '');
  const decoded = jwt.verify(token, secretKey);

  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
};
