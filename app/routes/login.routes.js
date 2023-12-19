const express = require('express');
const loginController = require('../controllers/Login.controller');
const { loginValidate } = require('../middlewares/login.validate.middleware');
const { tokenValidate } = require('../middlewares/token.validate.middleware');
const { userValidate } = require('../middlewares/user.validate.middleware');

const loginRouter = express.Router();

loginRouter.get(
  '/',
  loginController.getUsers
);

loginRouter.get(
  '/:id',
  loginController.getUserById
);

loginRouter.post(
  '/create',
  userValidate,
  tokenValidate,
  loginValidate,
  loginController.createUser
);

loginRouter.post(
  '/login',
  loginController.login
);

loginRouter.post(
  '/test-is-active',
  loginController.testTokenIsActive,
);

loginRouter.put(
  '/:id',
  tokenValidate,
  loginController.updateUser
);

loginRouter.delete(
  '/:id',
  tokenValidate,
  loginController.deleteUser
);

module.exports = {
  loginRouter,
};
