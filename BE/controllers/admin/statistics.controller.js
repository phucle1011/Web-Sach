
const Product = require('../../models/productModel');
const Order = require('../../models/orderModel'); 
const OrderDetail = require('../../models/oderDetail');
const User = require('../../models/userModel');
const Category = require('../../models/categoryModel');
const Comment = require('../../models/commentsModel');
const { Sequelize } = require('sequelize');



class StatisticsController {
    // 👉 Lấy tổng doanh thu từ các đơn đã hoàn thành
    static async getTotalRevenue(req, res) {
        try {
            const orders = await Order.findAll({ where: { status: 'Đã giao hàng thành công' } });
            console.log("dvfdcv",orders);
            
            const total = orders.reduce((sum, order) => sum + order.total_price, 0);

            res.status(200).json({
                status: 200,
                message: 'Lấy tổng doanh thu thành công',
                totalRevenue: total 
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // 👉 Lấy tổng số lượng đơn hàng
    static async getTotalOrders(req, res) {
        try {
            const count = await Order.count();

            res.status(200).json({
                status: 200,
                message: 'Lấy tổng số đơn hàng thành công',
                totalOrders: count
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // 👉 Lấy top 5 sản phẩm bán chạy nhất
    static async getTopSellingProducts(req, res) {
        try {
            const topProducts = await OrderDetail.findAll({
                attributes: [
                    'product_id',
                    [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalSold']
                ],
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['productId', 'title', 'price']
                    }
                ],
                group: ['product_id', 'product.productId'],
                order: [[Sequelize.literal('totalSold'), 'DESC']],
                limit: 5
            });

            res.status(200).json({
                status: 200,
                message: 'Lấy top sản phẩm bán chạy thành công',
                data: topProducts
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }


// 👉 Lấy tổng số người dùng
static async getUserCount(req, res) {
    try {
        const totalUsers = await User.count();
        res.status(200).json({ totalUsers });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

// 👉 Lấy tổng số loại sản phẩm
static async getCategoryCount(req, res) {
    try {
        const totalCategories = await Category.count();
        res.status(200).json({ totalCategories });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

// 👉 Lấy tổng số sản phẩm
static async getProductCount(req, res) {
    try {
        const totalProducts = await Product.count();
        res.status(200).json({ totalProducts });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

// 👉 Lấy tổng số bình luận
static async getCommentCount(req, res) {
    try {
        const totalComments = await Comment.count();
        res.status(200).json({ totalComments });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

}

module.exports = StatisticsController;