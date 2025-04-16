const connection = require('../database');
const { DataTypes } = require('sequelize');


 const Category = connection.define('Category', {
  categoryId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categories',
  timestamps: false
});

  
module.exports = Category;
