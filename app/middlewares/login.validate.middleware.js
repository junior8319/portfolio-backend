const loginValidate = (req, res, next) => {
  const { userName, password } = req.body;
  
  if (userName.length < 3) {
    return res.status(400).json({
      message: 'User name must be at least 3 characters.',
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters.',
    });
  }

  next();
};

module.exports = {
  loginValidate,
};