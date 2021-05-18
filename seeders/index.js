const seedCategories = require('./category-seed');
const seedProducts = require('./product-seed');


const sequelize = require('../config/config.json');

const seedAll = async () => {
    // await sequelize.sync({ force: true });

    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');

    await seedProducts();
    console.log('\n----- PRODUCTS SEEDED -----\n');

    process.exit(0);
};

seedAll();
