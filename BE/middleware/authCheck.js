const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const checkJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Bạn chưa đăng nhập hoặc token không hợp lệ!" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error("Lỗi khi giải mã token:", error); // Thêm dòng này để debug lỗi
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token đã hết hạn, vui lòng đăng nhập lại!" });
        }
        return res.status(401).json({ message: "Token không hợp lệ!", error: error.message });
    }
};


const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 1) {
        return res.status(403).json({ message: "Bạn không có quyền !" });
    }
    next();
};

module.exports = { checkJWT, isAdmin };
