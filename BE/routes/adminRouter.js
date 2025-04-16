const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/admin/categoryController');
const OrderController = require('../controllers/admin/orderController');

<<<<<<< HEAD
=======
const ContactController = require('../controllers/admin/contactController');
const ProductController = require('../controllers/admin/productController');
const { upload } = require('../middleware/upload');

>>>>>>> a21fd8ccee0ce9a6abb5fdb0efacb618e8069e93
router.get('/categories/list', CategoryController.get);
router.post('/categories/add', CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);
router.get('/categories/:id', CategoryController.getById); 

router.get('/orders/list', OrderController.get);
router.get('/orders/:id', OrderController.getById); 
router.delete("/orders/:id", OrderController.delete);

<<<<<<< HEAD
=======
router.get('/users/list', UserController.getAllUsers);
router.delete('/users/:id', UserController.deleteUser);
router.post('/users/add', UserController.addUser);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.update);

>>>>>>> a21fd8ccee0ce9a6abb5fdb0efacb618e8069e93
module.exports = router;