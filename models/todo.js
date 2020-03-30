'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model {
  }

  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATEONLY
  }, { sequelize });

  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};