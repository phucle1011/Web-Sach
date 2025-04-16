const { upload } = require('../middleware/upload');
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const productController = require('../controllers/productController');
const CategoryController = require('../controllers/categoryController');
router.get('/', (req, res) => {
    res.send('Trang chủ client');
});

router.post('/contact', contactController.sendContactEmail);
// Route lấy danh mục
// router.get('/categories', CategoryController.getAllCategories);
// // Lấy tất cả sản phẩm
// router.get('/products', productController.getAllProducts);

// // Lấy sản phẩm theo ID
// router.get('/product/:id', productController.getProductById);

// // Tạo sản phẩm mới
// router.post('/product', upload.single('images'), productController.createProduct);

// // Cập nhật sản phẩm
// router.put('/product/:id', upload.single('images'), productController.updateProduct);


// // Xóa sản phẩm
// router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
