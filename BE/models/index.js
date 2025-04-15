const sequelize = require("../database");

const User = require("./userModel");
const Product = require("./productModel");
const Order = require("./orderModel");
const OrderDetail = require("./oderDetail");
const Comment = require("./commentsModel");  // Sửa lại tên biến từ 'comments' thành 'Comment'
const Rating = require("./ratingModel");
const CartItem = require("./cartModel");
const Category = require("./categoryModel");

// Định nghĩa mối quan hệ giữa User và các models
User.hasMany(Order, { foreignKey: "user_id" });
User.hasMany(Comment, { foreignKey: "userId" });
User.hasMany(Rating, { foreignKey: "userId" });
User.hasMany(CartItem, { foreignKey: "user_id" });

// Định nghĩa mối quan hệ giữa Product và các models
Product.belongsTo(Category, { foreignKey: "categoryId" });
Product.hasMany(OrderDetail, { foreignKey: "product_id" });
Product.hasMany(Comment, { foreignKey: "productId" });
Product.hasMany(Rating, { foreignKey: "productId" });
Product.hasMany(CartItem, { foreignKey: "product_id" });

// Định nghĩa mối quan hệ giữa Order và các models
Order.belongsTo(User, { foreignKey: "user_id" });
Order.hasMany(OrderDetail, { foreignKey: "order_id" });

// Định nghĩa mối quan hệ giữa OrderDetail và các models
OrderDetail.belongsTo(Order, { foreignKey: "order_id" });
OrderDetail.belongsTo(Product, { foreignKey: "product_id" });

// Định nghĩa mối quan hệ giữa Category và Product
Category.hasMany(Product, { foreignKey: "categoryId" });

// Định nghĩa mối quan hệ giữa Rating và các models
Rating.belongsTo(User, { foreignKey: "userId" });
Rating.belongsTo(Product, { foreignKey: "productId" });

// Định nghĩa mối quan hệ giữa Comment và các models
Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Product, { foreignKey: "productId" });

// Định nghĩa mối quan hệ giữa CartItem và các models
CartItem.belongsTo(User, { foreignKey: "user_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

// Đảm bảo rằng các mối quan hệ giữa các model được gọi nếu cần thiết
User.associate = (models) => {
  // Cách gọi association nếu bạn sử dụng cách chia mối quan hệ ra các phương thức 'associate' trong từng model
  User.hasMany(models.Order, { foreignKey: 'user_id' });
  User.hasMany(models.Comment, { foreignKey: 'userId' });
  User.hasMany(models.Rating, { foreignKey: 'userId' });
  User.hasMany(models.CartItem, { foreignKey: 'user_id' });
};

Product.associate = (models) => {
  Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
  Product.hasMany(models.OrderDetail, { foreignKey: 'product_id' });
  Product.hasMany(models.Comment, { foreignKey: 'productId' });
  Product.hasMany(models.Rating, { foreignKey: 'productId' });
  Product.hasMany(models.CartItem, { foreignKey: 'product_id' });
};

// Export tất cả các model
module.exports = {
  sequelize,
  User,
  Product,
  Order,
  OrderDetail,
  Comment,
  Rating,
  CartItem,
  Category
};
