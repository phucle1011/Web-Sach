const Comment = require("../../models/commentsModel");
const User = require("../../models/userModel");

exports.create = async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  try {
    const { content, productId, userId } = req.body;
    const comment = await Comment.create({ content, productId, userId });
    res.status(201).json({ data: comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByProductId = async (req, res) => {
  try {
    const productId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const { count, rows } = await Comment.findAndCountAll({
      where: { productId },
      include: [{ model: User, attributes: ['name'], as: 'user' }],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.status(200).json({
      comments: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};