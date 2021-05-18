const { Category } = require('../models');

const categoryData = [
    {
        category_name: 'Residential Lights',
    },
    {
        category_name: 'Commercial Lights',
    },


];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
