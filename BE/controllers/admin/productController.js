const ProductModel = require('../../models/productModel');
const CategoryModel = require('../../models/categoryModel');
const { Op } = require("sequelize");
class ProductController {
  // Lấy danh sách sản phẩm
  static async get(req, res) {
    try {
      const products = await ProductModel.findAll({
        include: {
          model: CategoryModel,
          as: 'category', 
          attributes: ['categoryName'],
          required: false,
        }
      });

      const productsWithCategory = products.map(product => {
        return {
          ...product.dataValues,
          categoryName: product.category ? product.category.categoryName : 'Chưa có danh mục' 
        };
      });

      res.status(200).json({
        message: 'Lấy danh sách sản phẩm thành công',
        data: productsWithCategory
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Lấy sản phẩm theo ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id, {
        include: {
          model: CategoryModel,
          as: 'category', 
          attributes: ['categoryName'],
          required: false,
        }
      });

      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm byid' });
      }

      res.status(200).json({ data: product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Thêm sản phẩm mới
  static async add(req, res) {
    try {
      const {
        title,
        author,
        publisher,
        price,
        description,
        images, // Đảm bảo giá trị images là đường dẫn ảnh Cloudinary
        shortDescription,
        publicationDate,
        categoryId
      } = req.body;
  
      // Kiểm tra xem có URL ảnh Cloudinary không
      if (!images) {
        return res.status(400).json({ message: "Vui lòng cung cấp ảnh sản phẩm" });
      }
  
      // Lưu sản phẩm vào DB với URL ảnh
      const product = await ProductModel.create({
        title,
        author,
        publisher,
        price,
        description,
        images,  // Lưu trực tiếp đường dẫn ảnh
        shortDescription,
        publicationDate,
        categoryId
      });
  
      res.status(201).json({
        message: '✅ Thêm sản phẩm thành công',
        product
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  



  

  // Cập nhật sản phẩm
  static async update(req, res) {
    console.log(req.body);
    
    try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm để edit' });
      }

      const image = req.file ? `/images/${req.file.filename}` : product.image;

      await product.update({
        ...req.body,
        image
      });

      res.status(200).json({
        message: 'Cập nhật sản phẩm thành công',
        product
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Xóa sản phẩm
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm delete' });
      }

      await product.destroy();
      res.status(200).json({ message: 'Xoá sản phẩm thành công' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
  static async searchProduct(req, res) {
    try {
      const { searchTerm } = req.query;
  
      // Kiểm tra nếu không có từ khóa tìm kiếm
      if (!searchTerm || searchTerm.trim() === '') {
        return res.status(400).json({ message: 'Vui lòng cung cấp từ khóa tìm kiếm.' });
      }
  
      console.log("Từ khóa tìm kiếm:", searchTerm);
  
      // Thực hiện tìm kiếm trong các trường title, author và description
      const products = await ProductModel.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${searchTerm}%` } },  // Dùng LIKE thay cho ILIKE
            { author: { [Op.like]: `%${searchTerm}%` } },
            { description: { [Op.like]: `%${searchTerm}%` } }
          ]
        },
        include: {
          model: CategoryModel,
          as: 'category',
          attributes: ['categoryName'],
          required: false,  // Không yêu cầu category phải có
        }
      });
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào khớp với từ khóa.' });
      }
  
      const result = products.map(product => ({
        ...product.dataValues,
        categoryName: product.category ? product.category.categoryName : 'Chưa có danh mục'
      }));
  
      return res.status(200).json({
        message: 'Tìm kiếm sản phẩm thành công',
        data: result
      });
  
    } catch (error) {
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
      return res.status(500).json({ message: 'Lỗi server' });
    }
  }
}

module.exports = ProductController;
