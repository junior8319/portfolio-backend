const express = require('express');
const projectsController = require('../controllers/Projects.controller');

const projectsRouter = express.Router();

projectsRouter.get('/', projectsController.getAllProjects);
projectsRouter.get('/:id', projectsController.getProjectById);
projectsRouter.post('/', projectsController.createProject);
projectsRouter.put('/:id', projectsController.updateProject);
projectsRouter.delete('/:id', projectsController.deleteProject);

module.exports = {
  projectsRouter,
};