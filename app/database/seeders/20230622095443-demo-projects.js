'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      'projects',
      [
        {
          title: 'Business Flow',
          snapshot: '',
          description: 'Projeto desenvolvido para um processo seletivo e tem como ideia principal gerenciar notas fiscais emitidas, empresas cadastradas e movimentações financeiras a partir das notas fiscais.',
          project_url: '',
          start_date: new Date('2022-12-01'),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
