const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;
const adminRouter = require('./routes/adminRouter');
const apiRouter = require('./routes/apiRouter');
const clientRouter = require('./routes/clientRouter');
require ('./models/connectionModel');
app.use(express.json());

const session = require('express-session');

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Đặt true nếu dùng HTTPS
}));

app.use((err, req, res, next) => {
    console.error(err); 
    res.status(500).send('Lỗi máy chủ');
});


app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
}));

app.use("/",clientRouter);
app.use("/api",apiRouter);
app.use("/admin",adminRouter);

app.listen(port, () => {
    console.log('http://localhost:3000');
})