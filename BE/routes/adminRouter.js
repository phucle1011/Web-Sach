const express = require('express');
const router = express.Router();

const UserController = require('../controllers/admin/userController');
const CategoryController = require('../controllers/admin/categoryController');
const OrderController = require('../controllers/admin/orderController');
const CommentController = require('../controllers/admin/commentController');
const ContactController = require('../controllers/admin/contactController');
const StatisticsController = require('../controllers/admin/statistics.controller');

router.get('/categories/list', CategoryController.get);
router.post('/categories/add', CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);
router.get('/categories/:id', CategoryController.getById);

router.get('/orders/list', OrderController.get);
router.get('/orders/:id', OrderController.getById); 
router.put('/orders/:id', OrderController.update); 
router.delete("/orders/:id", OrderController.delete);

router.get('/comments/list', CommentController.get);
router.get('/comments/:id', CommentController.getById); 

router.get('/users/list', UserController.getAllUsers);
router.delete('/users/:id', UserController.deleteUser);
router.post('/users/add', UserController.addUser);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.update);

router.get('/contacts', ContactController.getAllContacts);


router.get('/statistics/total-orders', StatisticsController.getTotalOrders);
router.get('/statistics/top-selling-products', StatisticsController.getTopSellingProducts);
router.get('/statistics/total-revenue', StatisticsController.getTotalRevenue);
router.get('/statistics/user-count', StatisticsController.getUserCount);
router.get('/statistics/category-count', StatisticsController.getCategoryCount);
router.get('/statistics/product-count', StatisticsController.getProductCount);
router.get('/statistics/comment-count', StatisticsController.getCommentCount);



module.exports = router;