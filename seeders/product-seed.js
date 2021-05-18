const { Product } = require('../models');

const productData = [
    {
        product_name: 'GA3000',
        price: 1800.00,
        stock: 25,
        category_id: 2,
    },
    {
        product_name: 'GA4000',
        price: 2300.00,
        stock: 25,
        category_id: 1,
    },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
