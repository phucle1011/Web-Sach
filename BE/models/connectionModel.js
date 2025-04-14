module.exports = (db) => {
    const { User, Product, Order, OrderDetail, Category, Rating, Comment, CartItem } = db;
  
    // User associations
    User.hasMany(Order, { foreignKey: "user_id" });
    User.hasMany(Comment, { foreignKey: "userId" });
    User.hasMany(Rating, { foreignKey: "userId" });
    User.hasMany(CartItem, { foreignKey: "user_id" });
  
    // Product associations
    Product.belongsTo(Category, { foreignKey: "categoryId" });
    Product.hasMany(OrderDetail, { foreignKey: "product_id" });
    Product.hasMany(Comment, { foreignKey: "productId" });
    Product.hasMany(Rating, { foreignKey: "productId" });
    Product.hasMany(CartItem, { foreignKey: "product_id" });
  
    // Order associations
    Order.belongsTo(User, { foreignKey: "user_id" });
    Order.hasMany(OrderDetail, { foreignKey: "order_id" });
  
    // OrderDetail associations
    OrderDetail.belongsTo(Order, { foreignKey: "order_id" });
    OrderDetail.belongsTo(Product, { foreignKey: "product_id" });
  
    // Category associations
    Category.hasMany(Product, { foreignKey: "categoryId" });
  
    // Rating associations
    Rating.belongsTo(User, { foreignKey: "userId" });
    Rating.belongsTo(Product, { foreignKey: "productId" });
  
    // Comment associations
    Comment.belongsTo(User, { foreignKey: "userId" });
    Comment.belongsTo(Product, { foreignKey: "productId" });
  
    // CartItem associations
    CartItem.belongsTo(User, { foreignKey: "user_id" });
    CartItem.belongsTo(Product, { foreignKey: "product_id" });
  };
  