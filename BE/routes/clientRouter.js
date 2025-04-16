
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/client/authController');

router.get('/', (req, res) => {
    res.send('Trang chủ client');
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
