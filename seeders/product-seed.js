const { Product } = require('../models');

const productData = [
    {
        product_name: 'GA3000',
        type: "Residential Light",
        price: 1800.00,
        stock: 25,
        details: "This is a residential grow light! It is designed for home use!",
        image: "/assets/images/images-growers/light.jpeg",
        category_id: 1,
    },
    {
        product_name: 'GA4000',
        type: "Commercial Light",
        price: 2300.00,
        stock: 25,
        details: "This is a commercial grow light! It is designed for commercial use!",
        image: "/assets/images/images-growers/light.jpeg",
        category_id: 2,
    },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
