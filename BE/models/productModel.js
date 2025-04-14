const { DataTypes } = require("sequelize");
const connection = require("../database");

const Product = connection.define(
  "Product",
  {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    author: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    publisher: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    price: { 
      type: DataTypes.STRING(20),
      allowNull: false 
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    images: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    shortDescription: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    publicationDate: { 
      type: DataTypes.DATE, 
      allowNull: false 
    },
    categoryId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

module.exports = Product;
