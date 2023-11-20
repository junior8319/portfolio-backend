const express = require('express');
const stacksProjectsController = require('../controllers/StacksProjects.controller');

const stacksProjectsRouter = express.Router();

stacksProjectsRouter.get('/', stacksProjectsController.getAllStacksProjects);
stacksProjectsRouter.get('/:stackId/:projectId', stacksProjectsController.getStackProjectByPk);
stacksProjectsRouter.post('/', stacksProjectsController.createStackProject);
stacksProjectsRouter.put('/:stackId/:projectId', stacksProjectsController.updateStackProject);
stacksProjectsRouter.delete('/:stackId/:projectId', stacksProjectsController.deleteStackProject);

module.exports = {
  stacksProjectsRouter,
};