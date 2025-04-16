const OrderModel = require('../../models/orderModel');
const OrderDetailModel = require('../../models/oderDetail');
const ProductModel = require('../../models/productModel');

class OrderController {

    static async get(req, res) {
        try {
            const orders = await OrderModel.findAll({
                order: [['createdAt', 'DESC']], 
                include: [
                    {
                        model: OrderDetailModel, 
                        as: 'orderDetails',  
                        attributes: ['quantity'],
                        include: [
                            {
                                model: ProductModel, 
                                as: 'product', 
                                attributes: ['title', 'price'], 
                            },
                        ],
                    },
                ],
            });
    
            res.status(200).json({
                status: 200,
                message: "Lấy danh sách thành công",
                data: orders,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderModel.findByPk(id, {
                include: [
                    {
                        model: OrderDetailModel,  
                        as: 'orderDetails',  
                        attributes: ['quantity'],
                        include: [
                            {
                                model: ProductModel, 
                                as: 'product', 
                                attributes: ['title', 'price'], 
                            },
                        ],
                    },
                ],
            });
    
            if (!order) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }
    
            res.status(200).json({
                status: 200,
                data: order,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const order = await OrderModel.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            order.name = name;
            await order.save();

            res.status(200).json({
                message: "Cập nhật thành công",
                order
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const order = await OrderModel.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            if (order.status !== "Chờ xác nhận") {
                return res.status(400).json({ message: "Chỉ được xóa đơn hàng đang Chờ xác nhận" });
            }

            await order.destroy();

            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = OrderController;
