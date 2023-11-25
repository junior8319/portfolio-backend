const userValidate = async (request, response, next) => {
  const { userName, password, role } = request.body;


  if (!userName) {
    return response.status(400).json({
      message: 'Inform the user name, please.',
    });
  }

  if (!password) {
    return response.status(400).json({
      message: 'Inform the password, please.',
    });
  }

  if (!role || role.length === 0) {
    return response.status(400).json({
      message: 'Inform the role, please',
    });
  }

  next();
};

module.exports = {
  userValidate,
};
