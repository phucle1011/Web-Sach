
const { DataTypes } = require('sequelize');
const connection = require('../database');

const Rating = connection.define('Rating', {
    ratingId: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    productId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    rating: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    createdAt: { 
      type: DataTypes.DATE 
    },
  }, {
    tableName: 'ratings',
    timestamps: false,
  });
  
  module.exports = Rating;