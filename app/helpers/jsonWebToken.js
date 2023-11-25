const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const secretKey = process.env.TOKEN_SECRET;

const generateToken = (user) => {
  const token = jwt.sign(user, secretKey, { expiresIn: '24h' });

  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(
    token,
    secretKey,
    (err, decoded) => {
      if (err) {
        console.log('ERROR', err);
        return err;
      }
      return decoded;
    }
  );

  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
};
