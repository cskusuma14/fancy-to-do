'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model {
  }

  Todo.init({
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Title tidak boleh kosong'
        }
      }
    },
    description: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Description tidak boleh kosong'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATEONLY,
    UserId: DataTypes.INTEGER
  }, { sequelize });

  Todo.associate = function (models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};