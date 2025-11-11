const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/retech', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('❌ MongoDB connection error:', err));
const express = require('express');
const app = express();
app.use(express.json());
const Repair = require('./models/Repair');

let repairs = [
  { id: 1, name: "Abel Electronics Repair", rating: 4.8 },
  { id: 2, name: "TechFix Hub", rating: 4.5 },
];

// GET all
app.get('/repairs', (req, res) => res.json(repairs));

// GET by id
app.get('/repairs/:id', (req, res) => {
  const repair = repairs.find(r => r.id === parseInt(req.params.id));
  if (!repair) return res.status(404).send('Repair not found');
  res.json(repair);
});

// POST new
app.post('/repairs', (req, res) => {
  const newRepair = { id: repairs.length + 1, name: req.body.name, rating: req.body.rating };
  repairs.push(newRepair);
  res.status(201).json(newRepair);
});

// PUT update
app.put('/repairs/:id', (req, res) => {
  const repair = repairs.find(r => r.id === parseInt(req.params.id));
  if (!repair) return res.status(404).send('Repair not found');
  repair.name = req.body.name;
  repair.rating = req.body.rating;
  res.json(repair);
});

// DELETE
app.delete('/repairs/:id', (req, res) => {
  repairs = repairs.filter(r => r.id !== parseInt(req.params.id));
  res.send('Repair deleted');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
