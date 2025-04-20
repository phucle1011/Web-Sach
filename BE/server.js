const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = 3000;

const adminRouter = require('./routes/adminRouter');
const apiRouter = require('./routes/apiRouter');
const clientRouter = require('./routes/clientRouter');
require('./models/connectionModel');

app.use(cors({
    origin: 'http://localhost:4200',  // Chỉ cho phép frontend từ http://localhost:4200
    credentials: true,  // Cho phép gửi cookie và thông tin đăng nhập
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());

app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // dùng true nếu dùng HTTPS
        httpOnly: true,
        sameSite: 'lax'
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", clientRouter);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);

// Xử lý lỗi máy chủ
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
});

app.listen(port, () => {
    console.log('http://localhost:3000');
});
