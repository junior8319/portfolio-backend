const { verifyToken } = require("../helpers/jsonWebToken");

const tokenValidate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  tokenValidate,
};
