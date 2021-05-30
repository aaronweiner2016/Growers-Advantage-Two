
const { Model, DataTypes } = require('sequelize');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

module.exports = function (sequelize) {

  // set up fields and rules for Product model
  Product.init(
    {
      // define columns
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 10,
        validate: {
          isNumeric: true
        }
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Category',
          key: 'id',
          unique: false
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'product',
    }
  );
  return Product
}

