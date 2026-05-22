const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = 8000;
const SECRET_KEY = 'unani_dawakhana_secret_key_change_in_production';

// Initialize AI Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'AIzaSyD80J0juY_CdKNPrVXABHxt7mlXISr1Tik' });

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ounanidawakhana@gmail.com',
    pass: process.env.EMAIL_PASS || 'YOUR_GMAIL_APP_PASSWORD_HERE' // Replace with actual App Password
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize SQLite Database
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Tables
    db.serialize(() => {
      // Appointments Table
      db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        date TEXT,
        time TEXT,
        concern TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Orders Table
      db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT,
        customerPhone TEXT,
        address TEXT,
        city TEXT,
        pincode TEXT,
        paymentMethod TEXT,
        totalAmount REAL,
        items TEXT,
        status TEXT DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Products Table
      db.run(`CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        price REAL,
        originalPrice REAL,
        description TEXT,
        image TEXT,
        stock INTEGER,
        sold INTEGER,
        category TEXT,
        highlights TEXT
      )`);

      // Admin Table
      db.run(`CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )`, () => {
        // Create default admin if not exists
        db.get("SELECT * FROM admin WHERE username = 'admin'", (err, row) => {
          if (!row) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync('admin123', salt);
            db.run("INSERT INTO admin (username, password) VALUES (?, ?)", ['admin', hash]);
            console.log('Default admin created (admin / admin123)');
          }
        });
      });
    });
  }
});

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
app.post('/api/appointments', (req, res) => {
  const { name, phone, date, time, concern } = req.body;
  
  if (!name || !phone || !date) {
    return res.status(400).json({ error: 'Name, phone, and date are required' });
  }

  const sql = `INSERT INTO appointments (name, phone, date, time, concern) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [name, phone, date, time || '', concern || ''], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

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

    res.json({ success: true, message: 'Appointment booked successfully', id: this.lastID });
  });
});

// 2. Submit Order
app.post('/api/orders', (req, res) => {
  const { customerName, customerPhone, address, city, pincode, paymentMethod, totalAmount, items } = req.body;
  
  if (!customerName || !customerPhone || !items) {
    return res.status(400).json({ error: 'Name, phone, and items are required' });
  }

  const sql = `INSERT INTO orders (customerName, customerPhone, address, city, pincode, paymentMethod, totalAmount, items) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const itemsJson = JSON.stringify(items);
  
  db.run(sql, [customerName, customerPhone, address || '', city || '', pincode || '', paymentMethod || 'COD', totalAmount || 0, itemsJson], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

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

    res.json({ success: true, message: 'Order placed successfully', id: this.lastID });
  });
});

// 3. Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get("SELECT * FROM admin WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });
    
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '24h' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// 4. Get Orders (Admin Only)
app.get('/api/admin/orders', authenticateToken, (req, res) => {
  db.all("SELECT * FROM orders ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // Parse items JSON before sending
    const parsedRows = rows.map(r => ({...r, items: JSON.parse(r.items)}));
    res.json(parsedRows);
  });
});

// 5. Get Appointments (Admin Only)
app.get('/api/admin/appointments', authenticateToken, (req, res) => {
  db.all("SELECT * FROM appointments ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 6. Get All Products (Public)
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // Parse highlights JSON
    const parsedRows = rows.map(r => ({...r, highlights: r.highlights ? JSON.parse(r.highlights) : []}));
    res.json(parsedRows);
  });
});

// 7. Add or Update Product (Admin)
app.post('/api/admin/products', authenticateToken, (req, res) => {
  const { id, name, price, originalPrice, description, image, stock, sold, category, highlights } = req.body;
  const sql = `INSERT OR REPLACE INTO products (id, name, price, originalPrice, description, image, stock, sold, category, highlights) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const hlJson = JSON.stringify(highlights || []);
  db.run(sql, [id, name, price, originalPrice, description, image, stock || 50, sold || 10, category || 'General', hlJson], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// 8. Delete Product (Admin)
app.delete('/api/admin/products/:id', authenticateToken, (req, res) => {
  db.run("DELETE FROM products WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// 9. AI Hakeem Consultation Chat
app.post('/api/ai-consult', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    // In a real scenario, we'd fetch products from DB and feed them to the prompt
    // For now, we will use a static system prompt
    const systemInstruction = `
      You are "AI Hakeem", an expert Unani Doctor and AI assistant for 'Unani Dawakhana Official'.
      Your tone is professional, empathetic, and clinical. You help patients by listening to their symptoms and recommending natural Unani/Ayurvedic remedies.
      If a user asks for medical advice, recommend them to book a clinical appointment, but suggest an over-the-counter herbal product like 'Badshahi Safuf' for stamina, 'Qasmi Hair Oil' for hair, or 'Roghan Joint Oil' for pain.
      Always end by asking if they would like to book a direct consultation or place an order via WhatsApp.
    `;

    // Make the call
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ reply: "Maazrat, mera zehan abhi offline hai. (Please configure GEMINI_API_KEY). Aap seedha WhatsApp par Doctor se baat kar sakte hain." });
  }
});

// Fallback to index.html for SPA routing if needed
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
