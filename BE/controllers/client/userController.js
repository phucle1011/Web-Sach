const User = require('../../models/userModel');

class UserController {
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
}


module.exports = UserController;
