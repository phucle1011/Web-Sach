const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;
const adminRouter = require('./routes/adminRouter');
const apiRouter = require('./routes/apiRouter');
const clientRouter = require('./routes/clientRouter');
require ('./models/connectionModel');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
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