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
      const  productId  = req.params.id;
      console.log(req.params.id);
      
      const comments = await Comment.findAll({
        where: { productId },
        include: [{ model: User, attributes: ['name'],  as: 'user', }],
        order: [['createdAt', 'DESC']]
      });
      res.status(200).json({ data: comments });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };