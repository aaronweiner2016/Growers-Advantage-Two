const { Model, DataTypes } = require('sequelize');


class BlogCategory extends Model { }

module.exports = function (sequelize) {

    BlogCategory.init(
        {
            // define columns
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            blogCategory_name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'blogCategory'
        }
    );
    return BlogCategory;
}

