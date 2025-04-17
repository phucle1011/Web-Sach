
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/client/productController');
const CategoryController = require('../controllers/client/categoryController');
const AuthController = require('../controllers/client/authController');
const ContactController = require("../controllers/client/contactController");
const CartController = require('../controllers/client/cartController');

router.get('/', (req, res) => {
    res.send('Trang chủ client');
});

router.get('/product', ProductController.get); 
router.get('/product/:id', ProductController.getById); 

router.get('/category', CategoryController.get); 

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/cart/:userId', CartController.get);
router.post('/addcart', CartController.post);
router.delete('/removecart/:id', CartController.delete);
router.put('/updatecart', CartController.put);






router.post('/contact', ContactController.sendContactEmail);
router.post('/contact', ContactController.sendContactEmail);

module.exports = router;
