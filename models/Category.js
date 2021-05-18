const { Model, DataTypes } = require('sequelize');


class Category extends Model { }

module.exports = function (sequelize) {

  Category.init(
    {
      // define columns
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'category'
    }
  );
  return Category;
}

