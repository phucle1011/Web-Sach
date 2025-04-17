const nodemailer = require('nodemailer');
const Contact = require('../../models/contactModel')
require('dotenv').config();

exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin.' });
  }

  try {
    let contact = await Contact.findOne({ where: { email } });

    if (contact && contact.count >= 3) {
      return res.status(429).json({ error: 'Email này đã gửi quá 3 lần.' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Liên hệ từ ${name}`,
      text: `Email: ${email}\n\nNội dung:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    if (contact) {
      contact.count += 1;
      contact.message = message;
      await contact.save();
    } else {
      await Contact.create({ name, email, message });
    }

    res.status(200).json({ message: 'Gửi email và lưu thành công.' });

  } catch (err) {
    console.error('Lỗi:', err);
    res.status(500).json({ error: 'Gửi hoặc lưu thất bại.' });
  }
};


exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json({
      status: 200,
      message: 'Lấy danh sách liên hệ thành công',
      data: contacts, 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.status = 'Đã trả lời';
    await contact.save();

    return res.status(200).json({
      message: 'Contact status updated',
      contact, 
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};


