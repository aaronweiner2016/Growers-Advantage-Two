const { BlogCategory } = require('../models');

const categoryData = [
    {
        blogCategory_name: 'Plant Health',
    },
    {
        blogCategory_name: 'Indoor Growing',
    },
    {
        blogCategory_name: 'Growers Advantage',
    }


];

const seedBlogCategories = () => BlogCategory.bulkCreate(categoryData);

module.exports = seedBlogCategories;
