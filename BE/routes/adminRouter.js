const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/admin/categoryController');
const OrderController = require('../controllers/admin/orderController');

router.get('/categories/list', CategoryController.get);
router.post('/categories/add', CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);
router.get('/categories/:id', CategoryController.getById); 

router.get('/orders/list', OrderController.get);
router.get('/orders/:id', OrderController.getById); 
router.put('/orders/:id', OrderController.update); 
router.delete("/orders/:id", OrderController.delete);

module.exports = router;