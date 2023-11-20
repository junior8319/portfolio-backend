const { Stack, Project } = require('../database/models');

const getAllStacks = async () => {
  const stacks = await Stack.findAll({
    include: [{
      model: Project,
      through: { attributes: [] },
    }],
  });

  if (!stacks) {
    return null;
  }

  return stacks;
};

const findStackById = async (id) => {
  const stack = await Stack.findByPk(
    id,
    {
      include: [
        {
          model: Project,
          through: { attributes: [] },
        },
      ],
    },
  );

  if (!stack) {
    return null;
  }

  return stack.dataValues;
};

const createStack = async (stack) => {
  const newStack = await Stack.create(stack);
  if (!newStack) {
    return null;
  }
  return newStack.dataValues;
};

const updateStack = async (id, stack) => {
  const stackToUpdate = await findStackById(id);
  if (!stackToUpdate) return null;

  const updatedStack = await Stack.update(stack, { where: { id: id } });

  if (!updatedStack) {
    return null;
  }

  return updatedStack;
};

const deleteStack = async (id) => {
  const stackToDelete = await findStackById(id);
  if (!stackToDelete) return null;

  const deletedStack = await Stack.destroy({ where: { id: id } });

  if (!deletedStack) {
    return null;
  }

  return deletedStack;
};

module.exports = {
  getAllStacks,
  findStackById,
  createStack,
  updateStack,
  deleteStack,
};