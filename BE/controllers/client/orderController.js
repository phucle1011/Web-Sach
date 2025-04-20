const Order = require('../../models/orderModel');
const OrderDetail = require('../../models/oderDetail');
const Product = require('../../models/productModel');
require("dotenv").config();
const nodemailer = require("nodemailer");

exports.createOrder = async (req, res) => {
    try {
        let cart = req.body.products || [];
        console.log(cart);


        if (cart.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng của bạn đang trống.' });
        }

        let detailedCart = [];
        let totalPrice = 0;

        for (let item of cart) {
            let product = await Product.findByPk(item.product_id);
            if (!product) {
                return res.status(400).json({ message: `Sản phẩm ID ${item.product_id} không tồn tại.` });
            }

            let price = parseFloat(product.price.replace(/\./g, '').replace(',', '.')) * 1000;

            detailedCart.push({
                product_id: item.product_id,
                name: product.title,
                price: price,
                quantity: item.quantity,
                total: price * item.quantity,
            });

            totalPrice += price * item.quantity;
        }

        const user_id = req.body.user_id || null;

        if (!user_id) {
            return res.status(400).json({ message: 'Thiếu user_id trong yêu cầu.' });
        }


        const { name, phone, email, address, payment_method_id } = req.body;

        const currentDateTime = new Date(new Date().getTime() + (7 * 60 * 60 * 1000));

        const newOrder = await Order.create({
            name,
            phone,
            email,
            address,
            total_price: totalPrice,
            user_id,
            status: 'Chờ xác nhận',
            payment_method_id,
            created_at: currentDateTime,
        });

        const orderDetails = detailedCart.map(item => ({
            order_id: newOrder.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
        }));

        await OrderDetail.bulkCreate(orderDetails);

        await sendOrderConfirmationEmail(newOrder, email, currentDateTime);

        res.clearCookie('cart');

        res.status(200).json({
            message: 'Đặt hàng thành công. Cảm ơn bạn đã ủng hộ!',
            redirectUrl: '/products'
        });

    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error.message);
        res.status(500).send(`Đã xảy ra lỗi khi tạo đơn hàng: ${error.message}`);
    }
}

const sendOrderConfirmationEmail = async (order, customerEmail, currentDateTime) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const currentDateTimeUTC = new Date(currentDateTime.getTime() - (7 * 60 * 60 * 1000));

        const formattedDate = currentDateTimeUTC.toLocaleString("vi-VN", { hour12: false });

        const formattedPrice = new Intl.NumberFormat('vi-VN').format(order.total_price);

        const emailContent = `
            <h3>Cảm ơn bạn đã đặt hàng!</h3>
            <p><strong>Thông tin đơn hàng:</strong></p>
            <p><strong>Mã đơn hàng:</strong> ${order.id}</p>
            <p><strong>Ngày tạo:</strong> ${formattedDate}</p>
            <p><strong>Tổng tiền:</strong> ${formattedPrice} VND</p>
            <p><strong>Thông tin giao hàng:</strong></p>
            <p><strong>Họ tên:</strong> ${order.name}</p>
            <p><strong>Số điện thoại:</strong> ${order.phone}</p>
            <p><strong>Địa chỉ:</strong> ${order.address}</p>
            <p>Cảm ơn bạn đã ủng hộ chúng tôi!</p>
        `;

        let mailOptions = {
            from: `"Cửa hàng của chúng tôi" <${process.env.GMAIL_USER}>`,
            to: customerEmail,
            subject: `Xác nhận đơn hàng #${order.id}`,
            html: emailContent,
        };

        let info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Lỗi gửi email xác nhận đơn hàng:", error);
    }
};
exports.getUserOrders = async (req, res) => {
    try {
        const user_id = Number(req.query.userId);

        if (!user_id) {
            return res.status(400).json({ message: 'Thiếu user_id' });
        }

        const orders = await Order.findAll({
            where: { user_id },
            order: [['createdAt', 'DESC']], 
            include: [
              {
                model: OrderDetail,
                as: 'orderDetails'
              }
            ]
          });

        if (orders.length === 0) {
            return res.status(200).json({ orders: [], message: "Bạn chưa có đơn hàng nào." });
        }

        res.status(200).json({ orders: orders }); 

    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error.message);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tải đơn hàng của bạn.' });
    }
};

exports.delete =  async (req, res) => {
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

exports.confirmCompletion = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
        }

        order.status = "Đã giao hàng thành công";
        await order.save();

        return res.status(200).json({ message: "Đơn hàng đã giao thành công!" });
    } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        return res.status(500).json({ message: "Đã có lỗi xảy ra!" });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await Order.findOne({ where: { id: orderId, status: 'Chờ xác nhận' } });

        if (!order) {
            return res.send(`<script>alert('Chỉ có thể hủy đơn ở trạng thái "Chờ xác nhận"!'); window.location.href = '/orderUser';</script>`);
        }

        await order.destroy();

        res.send(`<script>alert('Đã hủy đơn hàng thành công!'); window.location.href = '/orderUser';</script>`);
    } catch (error) {
        console.error("Lỗi khi hủy:", error);
        res.send(`<script>alert('Lỗi khi hủy đơn hàng!'); window.location.href = '/orderUser';</script>`);
    }
};
