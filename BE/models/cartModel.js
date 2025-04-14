const { DataTypes } = require('sequelize');
const connection = require('../database');



const CartItem = connection.define('CartItem', {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    product_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    quantity: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    user_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
  }, {
    tableName: 'cart_items',
    timestamps: false,
  });
  
  module.exports = CartItem;