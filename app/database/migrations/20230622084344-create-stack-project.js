'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('stacksProjects',
      {
        stack_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: true,
          references: {
            model: {
              tableName: 'stacks',
            },
            key: 'id',
          },
        },
        project_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: true,
          references: {
            model: {
              tableName: 'projects',
            },
            key: 'id',
          },
        },
      },
    );
  },

  async down (queryInterface) {
    await queryInterface.dropTable('stacksProjects');
  }
};
