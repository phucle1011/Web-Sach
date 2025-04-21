
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/client/productController');
const CategoryController = require('../controllers/client/categoryController');
const AuthController = require('../controllers/client/authController');
const ContactController = require("../controllers/client/contactController");
const CartController = require('../controllers/client/cartController');
const OrderController = require('../controllers/client/orderController');
const commentController = require('../controllers/client/commentController');
const UserController = require('../controllers/client/userController');


router.get('/', (req, res) => {
    res.send('Trang chủ client');
});

router.get('/product', ProductController.get); 
router.get('/product/:id', ProductController.getById); 

router.get('/category', CategoryController.get); 

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.post("/forgot-password", AuthController.forgotPassword);
router.post("/otp", AuthController.OTP);
router.post("/reset-password", AuthController.resetPassword);

router.get('/cart/:userId', CartController.get);
router.post('/addcart', CartController.post);
router.delete('/removecart/:id', CartController.delete);
router.put('/updatecart', CartController.put);

router.post('/contact', ContactController.sendContactEmail);

router.post('/orders/add', OrderController.createOrder);
router.get('/orders/list', OrderController.getUserOrders);
router.delete("/orders/:id", OrderController.delete);
router.post('/orders/confirm-completion/:id', OrderController.confirmCompletion);

router.post('/comments', commentController.create); 
router.get('/comments/product/:id', commentController.getByProductId);

router.get('/users/:id', UserController.getUserById);

module.exports = router;
