require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 8000;
const SECRET_KEY = process.env.SECRET_KEY || 'unani_dawakhana_secret_key_change_in_production';

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ounanidawakhana@gmail.com',
    pass: process.env.EMAIL_PASS || 'YOUR_GMAIL_APP_PASSWORD_HERE'
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Schemas & Models
const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
  concern: String,
  created_at: { type: Date, default: Date.now }
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  address: String,
  city: String,
  pincode: String,
  paymentMethod: String,
  totalAmount: Number,
  items: Array,
  status: { type: String, default: 'Pending' },
  created_at: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});
const Admin = mongoose.model('Admin', adminSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas.');
    // Create default admin if not exists
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('admin123', salt);
      await Admin.create({ username: 'admin', password: hash });
      console.log('Default admin created (admin / admin123)');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware for Admin Auth
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API ROUTES ---

// 1. Submit Appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, phone, date, time, concern } = req.body;
    
    if (!name || !phone || !date) {
      return res.status(400).json({ error: 'Name, phone, and date are required' });
    }

    const newAppt = await Appointment.create({ name, phone, date, time, concern });

    // Send Email Alert
    const mailOptions = {
      from: 'ounanidawakhana@gmail.com',
      to: 'ounanidawakhana@gmail.com',
      subject: 'New Appointment Booking!',
      text: `New appointment booked by ${name}.\nPhone: ${phone}\nDate: ${date}\nTime: ${time || 'Not specified'}\nConcern: ${concern || 'Not specified'}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error('Error sending email:', error);
      else console.log('Appointment Email sent:', info.response);
    });

    res.json({ success: true, message: 'Appointment booked successfully', id: newAppt._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Submit Order
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, customerPhone, address, city, pincode, paymentMethod, totalAmount, items } = req.body;
    
    if (!customerName || !customerPhone || !items) {
      return res.status(400).json({ error: 'Name, phone, and items are required' });
    }

    const newOrder = await Order.create({
      customerName, customerPhone, address, city, pincode, paymentMethod, totalAmount, items
    });

    // Send Email Alert
    const mailOptions = {
      from: 'ounanidawakhana@gmail.com',
      to: 'ounanidawakhana@gmail.com',
      subject: 'New Order Received!',
      text: `New order from ${customerName}.\nPhone: ${customerPhone}\nAmount: Rs. ${totalAmount}\nAddress: ${address}, ${city}, ${pincode}\nPayment: ${paymentMethod}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error('Error sending email:', error);
      else console.log('Order Email sent:', info.response);
    });

    res.json({ success: true, message: 'Order placed successfully', id: newOrder._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });
    
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '24h' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// 4. Get Orders (Admin Only)
app.get('/api/admin/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ created_at: -1 });
    // MongoDB documents need to have their id mapped back if frontend expects 'id'
    const formattedOrders = orders.map(o => ({
      ...o.toObject(),
      id: o._id
    }));
    res.json(formattedOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Get Appointments (Admin Only)
app.get('/api/admin/appointments', authenticateToken, async (req, res) => {
  try {
    const appts = await Appointment.find().sort({ created_at: -1 });
    const formattedAppts = appts.map(a => ({
      ...a.toObject(),
      id: a._id
    }));
    res.json(formattedAppts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback to index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
