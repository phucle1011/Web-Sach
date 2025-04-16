const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const OrderController = require('../controllers/orderController');
const CommentController = require('../controllers/commentsController'); 


router.get('/categories/list', CategoryController.get);
router.post('/categories/add', CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);
router.get('/categories/:id', CategoryController.getById); 

router.get('/orders/list', OrderController.get);
router.get('/orders/:id', OrderController.getById); 
router.delete("/orders/:id", OrderController.delete);


router.get('/comments/list', CommentController.get); 
router.get('/comments/:id', CommentController.getById); 



module.exports = router;