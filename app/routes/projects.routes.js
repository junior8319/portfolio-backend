const express = require('express');
const projectsController = require('../controllers/Projects.controller');
const { tokenValidate } = require('../middlewares/token.validate.middleware');

const projectsRouter = express.Router();

projectsRouter.get('/', projectsController.getAllProjects);
projectsRouter.get('/:id', projectsController.getProjectById);
projectsRouter.post('/', tokenValidate, projectsController.createProject);
projectsRouter.put('/:id', tokenValidate, projectsController.updateProject);
projectsRouter.delete('/:id', tokenValidate, projectsController.deleteProject);

module.exports = {
  projectsRouter,
};