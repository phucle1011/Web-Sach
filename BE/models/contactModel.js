const { DataTypes } = require('sequelize');
const connection = require('../database');

const Contact = connection.define('contacts', {
  id: {
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
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Chưa trả lời',  
  },
  createdAt: {  
    type: DataTypes.DATE,
  },
}, {
  tableName: 'contacts',
  timestamps: true
});

module.exports = Contact;
