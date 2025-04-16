const Category = require('../models/categoryModel');


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      status: 200,
      message: 'Lấy danh sách danh mục thành công',
      data: categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi server' });
  }
};
