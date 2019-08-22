'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

Student.beforeCreate(function(instance) {
  instance.firstName =
    instance.firstName[0].toUpperCase() + instance.firstName.slice(1);
  instance.lastName =
    instance.lastName[0].toUpperCase() + instance.lastName.slice(1);
});

module.exports = Student;
