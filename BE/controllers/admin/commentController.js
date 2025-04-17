const CommentModel = require('../../models/commentsModel');
const UserModel = require('../../models/userModel');
const ProductModel = require('../../models/productModel');

class CommentController {

    static async get(req, res) {
        try {
            const comments = await CommentModel.findAll({
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

            res.status(200).json({
                status: 200,
                message: "Lấy danh sách thành công",
                data: comments
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

}

module.exports = CommentController;
