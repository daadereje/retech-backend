// app.js
const express = require('express');
const app = express();
app.use(express.json());

// Temporary data
let repairs = [
  { id: 1, name: "Abel Electronics Repair", rating: 4.8 },
  { id: 2, name: "TechFix Hub", rating: 4.5 },
];

// 🟢 Read all repairs
app.get('/repairs', (req, res) => {
  res.json(repairs);
});

// 🟢 Read single repair by id
app.get('/repairs/:id', (req, res) => {
  const repair = repairs.find(r => r.id === parseInt(req.params.id));
  if (!repair) return res.status(404).send('Repair not found');
  res.json(repair);
});

// 🟡 Create new repair
app.post('/repairs', (req, res) => {
  const newRepair = {
    id: repairs.length + 1,
    name: req.body.name,
    rating: req.body.rating
  };
  repairs.push(newRepair);
  res.status(201).json(newRepair);
});

// 🔵 Update repair
app.put('/repairs/:id', (req, res) => {
  const repair = repairs.find(r => r.id === parseInt(req.params.id));
  if (!repair) return res.status(404).send('Repair not found');

  repair.name = req.body.name;
  repair.rating = req.body.rating;
  res.json(repair);
});

// 🔴 Delete repair
app.delete('/repairs/:id', (req, res) => {
  repairs = repairs.filter(r => r.id !== parseInt(req.params.id));
  res.send('Repair deleted');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
