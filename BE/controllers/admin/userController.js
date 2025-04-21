const User = require('../../models/userModel');
const Comment = require('../../models/commentsModel');
const { UserModel } = require('../../models/connectionModel');
const { Op } = require("sequelize");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        users: [['createdAt', 'DESC']], 
        attributes: ['userId', 'name', 'email', 'phoneNumber', 'avatar']
      });
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'ID người dùng không hợp lệ' });
    }

    try {
      await Comment.destroy({ where: { userId } });

      const deleted = await User.destroy({ where: { userId } });

      if (deleted > 0) {
        return res.json({ message: 'Xóa người dùng và các comment liên quan thành công' });
      } else {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
    } catch (error) {
      console.error('Lỗi khi xóa user:', error.stack);
      return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  }

  static async addUser(req, res) {
    try {
      const { name, email, password, phoneNumber, address, role, avatar } = req.body;  
      const newUser = await User.create({ name, email, password, phoneNumber, address, role, avatar });
  
      // Trả về kết quả thành công
      return res.status(201).json({ message: 'Thêm người dùng thành công', user: newUser });
    } catch (error) {
      console.error('Lỗi khi thêm người dùng:', error.stack);
      return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  }
  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const file = req.file;
      const data = req.body;

      const user = await User.update(
        data,
        { where: { userId: req.params.id } }
      );

      res.json(user);
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
      res.status(500).json({
        message: "Đã có lỗi xảy ra",
        error: error.message
      });
    }
  }

  static async searchUser(req, res) {
    try {
      const { searchTerm } = req.query;
  
      // Kiểm tra nếu không có từ khóa tìm kiếm
      if (!searchTerm || searchTerm.trim() === '') {
        return res.status(400).json({ message: 'Vui lòng cung cấp từ khóa tìm kiếm.' });
      }
  
      console.log("Từ khóa tìm kiếm:", searchTerm);
  
      // Thực hiện tìm kiếm người dùng
      const users = await UserModel.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${searchTerm}%` } },
            { email: { [Op.like]: `%${searchTerm}%` } },
          ]
        }
      });
  
      if (users.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng nào khớp với từ khóa.' });
      }
  
      const result = users.map(user => ({
        ...user.dataValues
      }));
  
      return res.status(200).json({
        message: 'Tìm kiếm người dùng thành công',
        data: result
      });
  
    } catch (error) {
      console.error('Lỗi khi tìm kiếm người dùng:', error);
      return res.status(500).json({ message: 'Lỗi server' });
    }
  }
  
}


module.exports = UserController;
