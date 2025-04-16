const Product = require('./productModel');
const Category = require('./categoryModel');

// Gán quan hệ ở đây
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
  Product,
  Category
};
