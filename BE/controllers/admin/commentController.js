const CommentModel = require('../../models/commentsModel');
const UserModel = require('../../models/userModel');
const ProductModel = require('../../models/productModel');
const { Op } = require('sequelize');

class CommentController {

    static async get(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
    
            const { count, rows } = await CommentModel.findAndCountAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: UserModel,
                        as: 'user',
                        attributes: ['userId', 'name', 'email', 'phoneNumber', 'address'],
                    },
                    {
                        model: ProductModel,
                        as: 'product',
                        attributes: ['productId', 'title', 'price'],
                    }
                ],
                attributes: { exclude: ['userId', 'productId'] },
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
            const comment = await CommentModel.findByPk(id, {
                include: [
                    {
                        model: UserModel, 
                        as: 'user',  
                        attributes: ['userId', 'name', 'email', 'phoneNumber', 'address'],
                    },
                    {
                        model: ProductModel,  
                        as: 'product',  
                        attributes: ['productId', 'title', 'price'],
                    }
                ],
                attributes: { exclude: ['userId', 'productId'] }, 
            });

            if (!comment) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                status: 200,
                data: comment
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async searchComment(req, res) {
        try {
          const { searchTerm } = req.query;
      
          if (!searchTerm || searchTerm.trim() === '') {
            return res.status(400).json({ message: 'Vui lòng cung cấp từ khóa tìm kiếm.' });
          }
      
          console.log("Từ khóa tìm kiếm:", searchTerm);
      
          // Tìm kiếm bình luận trong cơ sở dữ liệu
          const comments = await CommentModel.findAll({
            where: {
                content: { [Op.like]: `%${searchTerm}%` }
            },
            include: [
              { model: UserModel, as: 'user', attributes: ['name'] },
              { model: ProductModel, as: 'product', attributes: ['title'] }
            ]
          });
          
      
          if (comments.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bình luận nào.' });  
          }
      
          const result = comments.map(comment => ({
            ...comment.dataValues
          }));
      
          return res.status(200).json({
            message: 'Tìm kiếm bình luận thành công',
            data: result
          });
      
        } catch (error) {
          console.error('Lỗi khi tìm kiếm bình luận:', error);
          return res.status(500).json({ message: 'Lỗi server' });
        }
      }
      

}

module.exports = CommentController;
