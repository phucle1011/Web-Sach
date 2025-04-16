const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/admin/categoryController');
const OrderController = require('../controllers/admin/orderController');

const contactController = require('../controllers/contactController');
const productController = require('../controllers/productController');
const { upload } = require('../middleware/upload');

router.get('/categories/list', CategoryController.get);
router.post('/categories/add', CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);
router.get('/categories/:id', CategoryController.getById); 

router.get('/orders/list', OrderController.get);
router.get('/orders/:id', OrderController.getById); 
router.delete("/orders/:id", OrderController.delete);

router.get('/contacts', contactController.getAllContacts);

router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.post('/product', productController.createProduct);
router.put('/product/:id', upload.single('images'), productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);



module.exports = router;