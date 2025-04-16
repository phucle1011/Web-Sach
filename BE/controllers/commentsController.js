const { Comment,Product ,User  } = require("../models");

class CommentController {
  // ✅ Lấy danh sách tất cả bình luận
  static async get(req, res) {
    try {
      const comments = await Comment.findAll({
        include: [
          {
              model: User,
              attributes: ['name'],
          },{
            model: Product,
            attributes: ['title'],
        }

      ],
        order: [['createdAt', 'DESC']]  // Sắp xếp theo ngày tạo
      });

      res.status(200).json({
        status: 200,
        message: 'Lấy danh sách bình luận thành công',
        data: comments
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ✅ Lấy bình luận theo ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id, {
        include: [
          {
              model: User,
              attributes: ['name'],
          }
      ]
      });

      if (!comment) {
        return res.status(404).json({ message: 'Bình luận không tồn tại' });
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
