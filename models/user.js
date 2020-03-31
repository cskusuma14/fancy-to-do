'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {
  }

  User.init({
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'name tidak boleh kosong'
        }
      }
    },
    username: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Username tidak boleh kosong'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Password tidak boleh kosong'
        }
      }
    },
    role: DataTypes.STRING,
    email: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Email tidak boleh kosong'
        },
        isEmail: {
          msg: 'Email tidak sesuai'
        }
      }
    },
  }, {
    sequelize,
    hooks: {
      beforeCreate: (model, option) => {
        model.password = hashPassword(model.password)
      }
    },
  });

  User.associate = function (models) {
    User.hasMany(models.Todo)
  };
  return User;
};