'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    product_name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    details: DataTypes.TEXT,
    image: DataTypes.TEXT,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};