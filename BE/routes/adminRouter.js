const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const contactController = require('../controllers/contactController');
const productController = require('../controllers/productController');
const { upload } = require('../middleware/upload');






router.get('/categories', CategoryController.getAllCategories);

router.get('/contacts', contactController.getAllContacts);

router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.post('/product', productController.createProduct);
router.put('/product/:id', upload.single('images'), productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);







module.exports = router;