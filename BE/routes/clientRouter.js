const { upload } = require('../middleware/upload');
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/client/authController');
const ContactController = require('../controllers/admin/contactController');

router.get('/', (req, res) => {
    res.send('Trang chủ client');
});

router.post('/contact', ContactController.sendContactEmail);

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
