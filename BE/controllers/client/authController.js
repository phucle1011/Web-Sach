const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

class AuthController {
    static async register(req, res) {
        try {
            console.log("Headers nhận được:", req.headers);
            console.log("Dữ liệu nhận được:", req.body);

            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email đã tồn tại!" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({ name, email, password: hashedPassword, role: "1", phoneNumber: '', address: '', avatar:'' });

            return res.status(201).json({ message: "Đăng ký thành công!", user });
        } catch (error) {
            console.error("Lỗi server:", error);
            return res.status(500).json({ message: "Lỗi server, vui lòng thử lại!" });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
    
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: "Email hoặc mật khẩu không chính xác!" });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Email hoặc mật khẩu không chính xác!" });
            }
    
            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: "1h" }
            );
    
            // Xoá mật khẩu trước khi trả về user
            const { password: _, ...userWithoutPassword } = user.toJSON();
    
            console.log("Token tạo thành công:", token);
    
            return res.status(200).json({
                message: "Đăng nhập thành công!",
                token,
                user: userWithoutPassword // Gửi thêm thông tin user
            });
    
        } catch (error) {
            console.error("Lỗi server:", error);
            return res.status(500).json({ message: "Lỗi server, vui lòng thử lại!", error: error.message });
        }
    }
    
}

module.exports = AuthController;
