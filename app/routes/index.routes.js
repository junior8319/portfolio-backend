const { stacksRouter } = require('./stacks.routes');
const { projectsRouter } = require('./projects.routes');
const { stacksProjectsRouter } = require('./stacksProjects.routes');
const { loginRouter } = require('./login.routes');

module.exports = {
  stacksRouter,
  projectsRouter,
  stacksProjectsRouter,
  loginRouter,
};