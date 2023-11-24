const express = require('express');
const stacksController = require('../controllers/Stacks.controller');
const { tokenValidate } = require('../middlewares/token.validate.middleware');

const stacksRouter = express.Router();

stacksRouter.get('/', stacksController.getAllStacks);
stacksRouter.get('/:id', stacksController.getStackById);
stacksRouter.post('/', tokenValidate, stacksController.createStack);
stacksRouter.put('/:id', tokenValidate, stacksController.updateStack);
stacksRouter.delete('/:id', tokenValidate, stacksController.deleteStack);

module.exports = {
  stacksRouter,
};