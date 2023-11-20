const { StackProject } = require('../database/models');

const getAll = async () => {
  const stacksProjectsList = await StackProject.findAll({
    include: [],
  });

  if (!stacksProjectsList) return null;

  return stacksProjectsList;
};

const getStackProjectByPk = async ({ stackId, projectId }) => {
  const stackProject = await StackProject.findOne({
    where: {
      stack_id: Number(stackId),
      project_id: Number(projectId),
    },
  });
  
  if (!stackProject) return null;


  return stackProject.dataValues;
};

const createStackProject = async (stackProject) => {
  const newStackProject = await StackProject.create(stackProject);

  if (!newStackProject) return null;

  return newStackProject.dataValues;
};

const updateStackProject = async (prevRegister, newRegister) => {
  const { stackId, projectId } = prevRegister;
  const stackProjectToUpdate = await StackProject.findByPk(
    Number(stackId),
    {
      where: {
        projectId: Number(projectId),
      }
    }
  );
  if (!stackProjectToUpdate) return null;

  const updatedStackProject = await StackProject.update(
    newRegister,
    {
      where: {
        stackId: Number(stackId),
        projectId: Number(projectId),
      },
    },
  );

  if (!updatedStackProject) return null;

  return updatedStackProject;
};

const deleteStackProject = async (stackProject) => {
  const { stackId, projectId } = stackProject;
  const stackProjectToDelete = await StackProject
  .findByPk(
    Number(stackId),
    {
      where: {
        projectId: Number(projectId),
      },
    }
  );
  if (!stackProjectToDelete) return null;

  const deletedStackProject = await StackProject.destroy({
    where: {
      stack_id: Number(stackId),
      project_id: Number(projectId),
    },
  });

  if (!deletedStackProject) return null;

  return deletedStackProject;
};

module.exports = {
  getAll,
  createStackProject,
  updateStackProject,
  deleteStackProject,
  getStackProjectByPk,
};