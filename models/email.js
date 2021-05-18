const { Model, DataTypes } = require('sequelize');

class Email extends Model { }

module.exports = function (sequelize) {
  Email.init({
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Email',
  });
  return Email;
}

