


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['categoryId', 'categoryName'] 
        }
      ]
    });

    res.status(200).json({
      status: 200,
      message: 'Lấy tất cả sản phẩm thành công',
      data: products
    });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['categoryId', 'categoryName']
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    res.status(200).json({
      status: 200,
      message: 'Lấy sản phẩm thành công',
      data: product
    });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};


exports.createProduct = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    const {
      title,
      author,
      publisher,
      price,
      description,
      shortDescription,
      publicationDate,
      categoryId,
      images
    } = req.body;

    const product = await Product.create({
      title,
      author,
      publisher,
      price,
      description,
      shortDescription,
      publicationDate,
      categoryId,
      images
    });

    res.status(201).json({
      message: 'Thêm sản phẩm thành công',
      data: product
    });
  } catch (error) {
    res.status(400).json({ error: 'Thêm sản phẩm thất bại', detail: error.message });
  }
};
  

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      title, author, publisher, price,
      description, shortDescription,
      publicationDate, categoryId
    } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
    }

    let imageUrl = product.images;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    await product.update({
      title,
      author,
      publisher,
      price,
      description,
      shortDescription,
      publicationDate,
      categoryId,
      images: imageUrl,
    });

    res.json({ message: 'Cập nhật sản phẩm thành công', data: product });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server', detail: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
    }

    await product.destroy();

    res.status(200).json({ message: 'Sản phẩm đã được xóa thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi xóa sản phẩm' });
  }
};

