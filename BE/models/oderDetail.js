const { DataTypes } = require('sequelize');
const connection = require('../database');


const OrderDetail = connection.define('OrderDetail', {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    order_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    product_id: { 
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    quantity: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    price: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
  }, {
    tableName: 'order_details',
    timestamps: false,
  });
  
  module.exports = OrderDetail;