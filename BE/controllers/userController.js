const User = require('../models/userModel');
const Comment = require('../models/commentsModel');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
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
  
}

module.exports = UserController;
