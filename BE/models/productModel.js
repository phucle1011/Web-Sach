const { DataTypes } = require('sequelize');
const connection = require('../database');

const Product = connection.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  publisher: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  images: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  publicationDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Categories', 
      key: 'categoryId'
    },
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;
