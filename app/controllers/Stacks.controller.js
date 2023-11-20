const stacksService = require('../services/Stacks.service');

const getAllStacks = async (_req, res) => {
  try {
    const stacks = await stacksService.getAllStacks();

    if (!stacks) {
      return res.status(404).json({
        message: 'Stacks not found',
      });
    }

    return res.status(200).json(stacks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getStackById = async(req, res) => {
  try {
    const stack = await stacksService.findStackById(req.params.id);

    if (!stack) {
      return res.status(404).json({
        message: 'Stack not found',
      });
    }

    return res.status(200).json(stack);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createStack = async (req, res) => {
  try {
    const newStack = await stacksService.createStack(req.body);
    if (!newStack) {
      return res.status(400).json({
        message: 'Stack not created',
      });
    }
    return res.status(201).json({ message: 'Successfully created stack.', stack: newStack });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateStack = async (req, res) => {
  try {
    const stackToUpdate = await stacksService.findStackById(req.params.id);
    const updatedStack = await stacksService.updateStack(stackToUpdate.id, req.body);

    if (!updatedStack) {
      return res.status(400).json({
        message: 'Stack not updated',
      });
    }

    return res.status(200).json({ message: 'Sucessfully updated.', stack: updatedStack });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteStack = async (req, res) => {
  try {
    const stackToDelete = await stacksService.findStackById(req.params.id);
    const deletedStack = await stacksService.deleteStack(stackToDelete.id);

    if (!deletedStack) {
      return res.status(400).json({
        message: 'Stack not deleted',
      });
    }

    return res.status(202).json({ message: 'Successfully deleted', stack: deletedStack });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllStacks,
  getStackById,
  createStack,
  updateStack,
  deleteStack,
};