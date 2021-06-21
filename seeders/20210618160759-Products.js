'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Products',
      [
        {
          product_name: 'GA1000',
          type: "Residential Light",
          price: 1800.00,
          stock: 25,
          details: "This is a residential grow light! It is designed for home use!",
          image: "/assets/images/images-growers/lightnew.png",
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_name: 'GA2000',
          type: "Residential Light",
          price: 2200.00,
          stock: 25,
          details: "This is a residential grow light! It is designed for home use!",
          image: "/assets/images/images-growers/lightnew.png",
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_name: 'GA3000',
          type: "Residential Light",
          price: 2600.00,
          stock: 25,
          details: "This is a residential grow light! It is designed for home use!",
          image: "/assets/images/images-growers/lightnew.png",
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_name: 'GA4000',
          type: "Residential Light",
          price: 2800.00,
          stock: 25,
          details: "This is a residential grow light! It is designed for home use!",
          image: "/assets/images/images-growers/lightnew.png",
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_name: 'GA5000',
          type: "Commercial Light",
          price: 3200.00,
          stock: 25,
          details: "This is a commercial grow light! It is designed for commercial use!",
          image: "/assets/images/images-growers/lightnew.png",
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Products', null, {});

  }
};
