
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/client/productController');
const CategoryController = require('../controllers/admin/categoryController');
const AuthController = require('../controllers/client/authController');

router.get('/', (req, res) => {
    res.send('Trang chủ client');
});

router.get('/product', ProductController.get); 
router.get('/product/:id', ProductController.getById); 


router.get('/category', CategoryController.get); 




router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
