'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('stacksProjects', [
      {
        stack_id: 1,
        project_id: 1,
      },
      {
        stack_id: 2,
        project_id: 1,
      },  
    ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('stacksProjects', null, {});
  }
};
