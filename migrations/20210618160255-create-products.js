'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true
        }
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
          isNumeric: true
        }
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ProductCategories',
          key: 'id',
          unique: false
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};