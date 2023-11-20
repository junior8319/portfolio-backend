const { Login } = require('../database/models');
const { generateToken } = require('../helpers/jsonWebToken');
const bCrypt = require('bcrypt');

const getUsers = async () => {
  const users = await Login.findAll({
    attributes: { exclude: ['password'] },
  });

  if (!users) {
    return null;
  }

  return users;
};

const getUserById = async (id) => {
  const user = await Login.findByPk(
    id,
    {
      attributes: { exclude: ['password'] },
    }
  );

  if (!user) {
    return null;
  }

  return user.dataValues;
};

const getUserByName = async (name) => {
  const user = await Login.findOne({ where: { userName: name } });

  if (!user) {
    return null;
  }

  return user.dataValues;
};

const userExists = async (name) => {
  const user = await getUserByName(name);

  if (!user) {
    return false;
  }

  return true;
};

const getToken = async (user) => {
  const userData = await getUserByName(user.userName);

  if (!userData) return null;

  const token = await generateToken({
    id: userData.id,
    userName: userData.userName,
    role: userData.role,
  });

  if (!token) return null;

  return { user: userData, token };
};

const createUser = async (user) => {
  const encryptedPassword = await bCrypt.hash(user.password, 10);
  user.password = encryptedPassword;

  const newUser = await Login.create(user);
  if (!newUser) {
    return null;
  }

  const token = await generateToken({
    id: newUser.id,
    userName: newUser.userName,
    role: newUser.role,
  });

  delete newUser.dataValues.password;

  return { user: newUser.dataValues, token };
};

const updateUser = async (id, user) => {
  const userToUpdate = await getUserById(id);
  let encryptedPassword = ''; 
  
  if (!userToUpdate) return null;

  if (user.password) {
    encryptedPassword = await bCrypt.hash(user.password, 10);
    user.password = encryptedPassword;
  }

  const updatedUser = await Login.update(user, { where: { id: id } });

  if (!updatedUser) {
    return null;
  }

  return updatedUser;
};

const deleteUser = async (id) => {
  const userToDelete = await getUserById(id);
  if (!userToDelete) return null;

  const deletedUser = await Login.destroy({ where: { id: id } });

  if (!deletedUser) {
    return null;
  }

  return deletedUser;
};

const login = async (userName, password) => {
  const user = await getUserByName(userName);

  if (!user) return null;

  const match = await bCrypt.compare(password, user.password);

  if (!match || !password || password.length === 0) return null;

  const token = await generateToken({
    id: user.id,
    userName: user.userName,
    role: user.role,
  });

  if (!token) return null;

  delete user.password;
  
  const data = { userData: user, token };

  return data;
}

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  userExists,
  getToken,
  createUser,
  updateUser,
  deleteUser,
  login,
};
