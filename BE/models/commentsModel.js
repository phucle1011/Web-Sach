const { DataTypes } = require('sequelize');
const connection = require('../database');


const Comment = connection.define('Comment', {
    commentId: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, primaryKey: true 
    },
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    productId: { 
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    content: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    createdAt: { 
      type: DataTypes.DATE 
    },
    updatedAt: { 
      type: DataTypes.DATE 
    },
  }, {
    tableName: 'comments',
    timestamps: true,
  });
  
  
  module.exports = Comment;