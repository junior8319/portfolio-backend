const stacksProjectsService = require('../services/StacksProjects.service');

const getAllStacksProjects = async (_request, response) => {
  try {
    const stacksProjectsList = await stacksProjectsService.getAll();

    if (!stacksProjectsList) {
      return response.status(404).json({
        message: 'Stacks associated with projects not found.',
      });
    }

    return response.status(200).json(stacksProjectsList);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};

const getStackProjectByPk = async (request, response) => {
  try {
    const paramsToSearch = {
      stackId: request.params.stackId,
      projectId: request.params.projectId,
    };

    const stackProject = await stacksProjectsService.getStackProjectByPk(paramsToSearch);
    if (!stackProject) return response
      .status(404)
      .json({
        message:
          `Association of stackId:${paramsToSearch.stackId} and ` +
          `projectId:${paramsToSearch.projectId} not found.`,
      });

    return response.status(200).json(stackProject);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error.' });
  }
};

const createStackProject = async (request, response) => {
  try {
    const newStackProject = await stacksProjectsService.createStackProject(request.body);

    if (!newStackProject) return response
      .status(400)
      .json({
        message: `Unable to associate this stackId: ${request.body.stackId} 
        with this projectId: ${request.body.projectId}`,
      });

    return response.status(201)
      .json({
        message: 'Successfully associated.',
        stackProject: newStackProject,
      });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error.' });
  }
};

const updateStackProject = async (request, response) => {
  try {
    const { stackId, projectId } = request.params;
    const stackProjectToUpdate = await stacksProjectsService.updateStackProject({ stackId, projectId }, request.body);

    if (!stackProjectToUpdate) return response
      .status(400)
      .json({
        message: 'Unable to change this association',
      });

    return response.status(200).json({
      message: 'Successfully updated.',
      stackProject: stackProjectToUpdate,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error.' });
  }
};

const deleteStackProject = async (request, response) => {
  try {
    const paramsToSearch = {
      stackId: request.params.stackId,
      projectId: request.params.projectId,
    };

    console.log('paramsToSearch', paramsToSearch);

    const stackProjectToDelete = await stacksProjectsService.getStackProjectByPk(paramsToSearch);
    if (!stackProjectToDelete) response
    .status(404)
    .json({
      message: 'Association to exclude not found',
    });

    const deletedStackProject = await stacksProjectsService.deleteStackProject(stackProjectToDelete);
    if (!deletedStackProject) return response
    .status(400)
    .json({
      message: 'Unable to exclude the association.',
      stackProject: stackProjectToDelete,
    });

    return response
    .status(202)
    .json({
      message: 'Successfully deleted association.',
      stackProject: stackProjectToDelete,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  getAllStacksProjects,
  getStackProjectByPk,
  createStackProject,
  updateStackProject,
  deleteStackProject,
}