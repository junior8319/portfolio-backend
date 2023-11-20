const jwt = require('jsonwebtoken');
const fs = require('fs');

const secretKey = fs.readFileSync('jwt.evaluation.key', 'utf8', (err, data) => {
  if (err) throw err;
  return data;
});

const generateToken = async (user) => {
  const token = await jwt.sign(user, secretKey, { expiresIn: '24h' });

  return token;
};

console.log('SECRET KEY', secretKey);

const verifyToken = (token) => {
  const decoded = jwt.verify(token, secretKey);

  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
};
