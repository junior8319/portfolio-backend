const loginService = require('../services/Login.service');

const getUsers = async (_req, res) => {
  try {
    const users = await loginService.getUsers();
  
    if (!users) {
      return res.status(404).json({
        message: 'Users not found',
      });
    }
  
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await loginService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const alreadyExists = await loginService.userExists(req.body.userName);
    if (alreadyExists) return res
    .status(403)
    .json({
      message: 'User already exists.',
    });

    const newUser = await loginService.createUser(req.body);
    if (!newUser) {
      return res.status(400).json({
        message: 'User not created',
      });
    }
    return res.status(201)
    .json({
      message: 'Successfully created user.',
      user: newUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userToUpdate = await loginService.getUserById(req.params.id);
    const updatedUser = await loginService.updateUser(userToUpdate.id, req.body);

    if (!updatedUser) {
      return res.status(400).json({
        message: 'User not updated',
      });
    }

    return res.status(200).json({
      message: 'Successfully updated user.',
      user: updatedUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userToDelete = await loginService.getUserById(req.params.id);
    const deletedUser = await loginService.deleteUser(userToDelete.id);

    if (!deletedUser) {
      return res.status(400).json({
        message: 'User not deleted',
      });
    }

    return res.status(200).json({
      message: 'Successfully deleted user.',
      user: deletedUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const token = await loginService.login(userName, password);
    if (!token) {
      return res.status(400).json({
        message: 'Invalid fields',
      });
    }
    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const testTokenIsActive = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization;
    const tokenIsActive = await loginService.testTokenIsActive(token);
    console.log('TOKEN IS ACTIVE: ', typeof tokenIsActive);

    if (!tokenIsActive || tokenIsActive.message === 'jwt expired') {
      return res.status(401).json({
        message: 'Token expired.',
      });
    }
    return res.status(200).json(tokenIsActive.message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  testTokenIsActive,
};
