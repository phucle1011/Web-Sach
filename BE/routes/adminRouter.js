const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/admin/categoryController');
const OrderController = require('../controllers/admin/orderController');

const ContactController = require('../controllers/admin/contactController');
const ProductController = require('../controllers/admin/productController');
const { upload } = require('../middleware/upload');

router.get('/categories/list', CategoryController.get);
router.post('/categories/add', CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);
router.get('/categories/:id', CategoryController.getById); 

router.get('/orders/list', OrderController.get);
router.get('/orders/:id', OrderController.getById); 
router.delete("/orders/:id", OrderController.delete);

router.get('/contacts', ContactController.getAllContacts);

router.get('/products', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProductById);
router.post('/product', ProductController.createProduct);
router.put('/product/:id', upload.single('images'), ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);



module.exports = router;