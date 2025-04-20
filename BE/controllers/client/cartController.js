const Product = require("../../models/productModel");
const Cart = require("../../models/cartModel"); 

class CartController {
  static async get(req, res) {
    try {
      const userId = req.params.userId; 

      const cartItems = await Cart.findAll({
        where: { user_id: userId },
        include: {
          model: Product,
          as: 'product', 
        }
      });

      if (cartItems.length > 0) {
        res.json({ data: cartItems });
      } else {
        res.status(404).json({ message: 'Giỏ hàng trống' });
      }
    } catch (error) {
      console.error("Lỗi lấy giỏ hàng:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
  
  static async post(req, res) {
    console.log(req.body);
    
    const { user_id, product_id, quantity } = req.body;

    try {
      let cartItem = await Cart.findOne({
        where: { user_id: user_id, product_id: product_id }
      });

      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
        res.status(200).json({ message: 'Cập nhật giỏ hàng thành công', data: cartItem });
      } else {
        const newCartItem = await Cart.create({
          user_id: user_id,
          product_id: product_id,
          quantity,
        });
        res.status(201).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công', data: newCartItem });
      }
    } catch (error) {
      console.error("Lỗi thêm sản phẩm vào giỏ hàng:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
static async put(req, res) {
    const { user_id, product_id, quantity } = req.body;
  
    try {
      const cartItem = await Cart.findOne({
        where: { user_id: user_id, product_id: product_id }
      });
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.status(200).json({
        message: 'Cập nhật giỏ hàng thành công',
        data: cartItem
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
  static async delete(req, res) {
    const cart_id = req.params.id;  
    const user_id = req.query.user_id;  
    
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      const cartItem = await Cart.findOne({
        where: { id: cart_id, user_id: user_id }
      });
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
      }

      await cartItem.destroy();
  
      res.status(200).json({
        message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
        data: cartItem
      });
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
  
  

  
}

module.exports = CartController;
