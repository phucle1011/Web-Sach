
const { DataTypes } = require('sequelize');
const connection = require('../database');


const User = connection.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE
  },
  role: {
    type: DataTypes.ENUM('Admin', 'User'),
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: 'users',
  timestamps: false,
});


module.exports = User;