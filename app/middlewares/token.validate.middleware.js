const { verifyToken } = require("../helpers/jsonWebToken");

const tokenValidate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    console.log('token', token);
    const decoded = await verifyToken(token);
    console.log('decoded', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  tokenValidate,
};
