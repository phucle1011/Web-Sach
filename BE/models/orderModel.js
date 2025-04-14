const { DataTypes } = require('sequelize');
const connection = require('../database');

const Order = connection.define('Order', {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true },
    user_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    total_price: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    status: {
      type: DataTypes.ENUM(
        'Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Hoàn thành', 'Đã giao hàng thành công', 'Đã hủy'
      ),
      allowNull: false,
    },
    created_at: { 
      type: DataTypes.DATE 
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    address: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    phone: { 
      type: DataTypes.STRING(10), 
      allowNull: false 
    },
    payment_method_id: {
      type: DataTypes.ENUM('Thanh toán khi nhận hàng', 'Đã thanh toán thành công'),
      allowNull: false,
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
  }, {
    tableName: 'orders',
    timestamps: false,
  });
  
  module.exports = Order;