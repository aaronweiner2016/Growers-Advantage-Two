
const { Model, DataTypes } = require('sequelize');

// Initialize Product model (table) by extending off Sequelize's Model class
class BlogPosts extends Model { }

module.exports = function (sequelize) {

    // set up fields and rules for Product model
    BlogPosts.init(
        {
            // define columns
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            author: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            date: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            post: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            blogCategory_id: {
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
            modelName: 'blogposts',
        }
    );
    return BlogPosts
}

