const { Project, Stack } = require('../database/models');
const stacksProjectsService = require('./StacksProjects.service');

const getAllProjects = async () => {
  const projects = await Project.findAll({
    include: [{
      model: Stack,
      through: { attributes: [] },
    }],
  });

  if (!projects) {
    return null;
  }

  return projects.map(project => project);
};

const getProjectById = async (id) => {
  const project = await Project.findByPk(
    Number(id),
    {
      include: [
        {
          model: Stack,
          through: { attributes: [] },
        }
      ],
    },
  );

  if (!project) return null;

  return project.dataValues;
};

const createProject = async (project) => {
  const newProject = await Project.create(project);

  if (!newProject) return null;

  return newProject.dataValues;
};

const updateProject = async (id, project) => {
  const projectToUpdate = await getProjectById(id);
  if (!projectToUpdate) return null;

  const updatedProject = await Project.update(project, { where: { id } });

  if (!updatedProject) return null;

  return updatedProject;
};

const deleteProject = async (id) => {
  let projectToDelete = await getProjectById(id);
  if (!projectToDelete) return null;

  const stacksIds = projectToDelete.Stacks
  .map(stack => stack.dataValues.id);

  if (stacksIds.length && stacksIds.length > 0) {
    if (stacksIds.length > 0) {
      stacksIds.forEach(async (stackId) => {
        
        await stacksProjectsService
        .deleteStackProject(
          {
            stackId,
            projectId: id
          }
        );
      });
    }
  }

  projectToDelete = await getProjectById(id);
  if (!projectToDelete) return null;

  const deletedProject = await Project.destroy({ where: { id } });

  if (!deletedProject) return null;

  return deletedProject;
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};