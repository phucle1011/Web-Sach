const CategoryModel = require('../../models/categoryModel');

class CategoryController {

    static async get(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
    
            const { count, rows } = await CategoryModel.findAndCountAll({
                limit,
                offset,
                order: [['categoryId', 'ASC']]
            });
    
            const totalPages = Math.ceil(count / limit);
    
            res.status(200).json({
                status: 200,
                message: "Lấy danh sách thành công",
                data: rows,
                total: count,
                totalPages,
                currentPage: page
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                "status": 200,
                "data": category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { categoryName, status } = req.body;
            const category = await CategoryModel.create({ categoryName , status });
            

            res.status(201).json({
                message: "Thêm mới thành công",
                category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { categoryName, status } = req.body;
    
            console.log('Received categoryName:', categoryName);  
            console.log('Received status:', status); 
    
            const category = await CategoryModel.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }
    
            category.categoryName = categoryName;
            category.status = status || 'hiện'; // Default 'hiện' if no status provided
            await category.save();
    
            res.status(200).json({
                message: "Cập nhật thành công",
                category,
            });
        } catch (error) {
            console.error('Error during update:', error);  // Log error details
            res.status(500).json({ error: error.message });
        }
    }
    
      

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            await category.destroy();

            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async searchCategory(req, res) {
        try {
          const { searchTerm } = req.query;
      
          // Kiểm tra nếu không có từ khóa tìm kiếm
          if (!searchTerm || searchTerm.trim() === '') {
            return res.status(400).json({ message: 'Vui lòng cung cấp từ khóa tìm kiếm.' });
          }
      
          console.log("Từ khóa tìm kiếm:", searchTerm);
      
          // Thực hiện tìm kiếm trong các trường title, author và description
          const categories = await CategoryModel.findAll({
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
      
          if (categories.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào khớp với từ khóa.' });
          }
      
          const result = categories.map(product => ({
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

module.exports = CategoryController;
