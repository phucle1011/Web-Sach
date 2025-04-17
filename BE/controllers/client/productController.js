const  Product  = require("../../models/productModel");
const  Category  = require("../../models/categoryModel");

class ProductController {
  static async get(req, res) {
    try {
        const { categoryId } = req.query;
    
        let condition = {};
        if (categoryId) {
          condition.categoryId = categoryId;
        }
    
        const products = await Product.findAll({ where: condition });
    
        res.status(200).json({ data: products });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          {
            model: Category, 
            as: 'category',
            attributes: ['categoryName'],
          },
        ]
      });

      if (!product) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }

      res.status(200).json({
        status: 200,
        data: product
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
