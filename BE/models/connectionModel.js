const UserModel = require('./userModel');
const ProductModel = require('./productModel');
const OrderModel = require('./orderModel');
const OrderDetailModel = require('./oderDetail');
const CategoryModel = require('./categoryModel');
const RatingModel = require('./ratingModel');
const CommentModel = require('./commentsModel');
const CartItemModel = require('./cartModel');

//--------------------- [ Thiết lập quan hệ ]------------------------

// User - Order
UserModel.hasMany(OrderModel, { foreignKey: 'user_id', as: 'orders' });
OrderModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });

// Quan hệ giữa Order và OrderDetail
OrderModel.hasMany(OrderDetailModel, { foreignKey: 'order_id', as: 'orderDetails' });
OrderDetailModel.belongsTo(OrderModel, { foreignKey: 'order_id', as: 'order' });

// Quan hệ giữa OrderDetail và Product
OrderDetailModel.belongsTo(ProductModel, { foreignKey: 'product_id', as: 'product' });
ProductModel.hasMany(OrderDetailModel, { foreignKey: 'product_id', as: 'orderDetails' });

// Category - Product
ProductModel.belongsTo(CategoryModel, { foreignKey: 'categoryId', as: 'category' });
CategoryModel.hasMany(ProductModel, { foreignKey: 'categoryId', as: 'products' });


// Rating - User
RatingModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
RatingModel.belongsTo(ProductModel, { foreignKey: 'productId', as: 'product' });

// Comment - User
CommentModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
CommentModel.belongsTo(ProductModel, { foreignKey: 'productId', as: 'product' });

// CartItem - User
CartItemModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });
CartItemModel.belongsTo(ProductModel, { foreignKey: 'product_id', as: 'product' });


module.exports = {
  UserModel, 
  ProductModel, 
  OrderModel, 
  OrderDetailModel, 
  CategoryModel, 
  RatingModel, 
  CommentModel, 
  CartItemModel
};
