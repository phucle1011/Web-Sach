
const express = require('express');
const ProductController = require('../controllers/client/productController');
const CategoryController = require('../controllers/categoryController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Trang chủ client');
});

router.get('/product', ProductController.get); 
router.get('/product/:id', ProductController.getById); 


router.get('/category', CategoryController.get); 






module.exports = router;
