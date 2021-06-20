'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('ProductCategories',
      [
        {
          category_name: 'Residential Lights',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Commercial Lights',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('ProductCategories', null, {});
  }
};
