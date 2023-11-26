const express = require('express');
const stacksProjectsController = require('../controllers/StacksProjects.controller');
const { tokenValidate } = require('../middlewares/token.validate.middleware');

const stacksProjectsRouter = express.Router();

stacksProjectsRouter.get(
  '/',
  stacksProjectsController.getAllStacksProjects
);

stacksProjectsRouter.get(
  '/:stackId/:projectId',
  stacksProjectsController.getStackProjectByPk
);

stacksProjectsRouter.post(
  '/',
  tokenValidate,
  stacksProjectsController.createStackProject
);

stacksProjectsRouter.put(
  '/:stackId/:projectId',
  tokenValidate,
  stacksProjectsController.updateStackProject
);

stacksProjectsRouter.delete(
  '/:stackId/:projectId',
  tokenValidate,
  stacksProjectsController.deleteStackProject
);

module.exports = {
  stacksProjectsRouter,
};