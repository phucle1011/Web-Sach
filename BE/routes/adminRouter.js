const express = require('express');
const router = express.Router();
<<<<<<< HEAD

const UserController = require('../controllers/admin/userController');
const CategoryController = require('../controllers/admin/categoryController');
const OrderController = require('../controllers/admin/orderController');
const CommentController = require('../controllers/admin/commentController');
const ContactController = require('../controllers/admin/contactController');
=======
const CategoryController = require('../controllers/categoryController');
const OrderController = require('../controllers/orderController');
const UserController = require('../controllers/userController');
>>>>>>> c07f176b841c553a183ef46c892a48ff6ad329f8

router.get('/categories/list', CategoryController.get);
router.post('/categories/add', CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);
router.get('/categories/:id', CategoryController.getById);

router.get('/orders/list', OrderController.get);
router.get('/orders/:id', OrderController.getById); 
router.put('/orders/:id', OrderController.update); 
router.delete("/orders/:id", OrderController.delete);

<<<<<<< HEAD
router.get('/comments/list', CommentController.get);
router.get('/comments/:id', CommentController.getById); 

=======
>>>>>>> c07f176b841c553a183ef46c892a48ff6ad329f8
router.get('/users/list', UserController.getAllUsers);
router.delete('/users/:id', UserController.deleteUser);
router.post('/users/add', UserController.addUser);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.update);

<<<<<<< HEAD
router.get('/contacts', ContactController.getAllContacts);

=======
>>>>>>> c07f176b841c553a183ef46c892a48ff6ad329f8
module.exports = router;