// app.js
const express = require('express');
const mongoose = require('mongoose');

// 🟢 Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/retech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// 🟢 Initialize Express App
const app = express();
app.use(express.json());

// 🟢 Simple Test Route
app.get('/', (req, res) => {
  res.send('Welcome to ReTech Backend API 💚');
});

// 🟢 Import Model
const Repair = require('./models/Repair');

// 🟢 Get all repairs
app.get('/repairs', async (req, res) => {
  try {
    const repairs = await Repair.find();
    res.json(repairs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🟣 Add new repair
app.post('/repairs', async (req, res) => {
  try {
    const repair = new Repair({
      name: req.body.name,
      rating: req.body.rating,
      address: req.body.address,
      contact: req.body.contact
    });
    const result = await repair.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🟢 Start Server
app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
