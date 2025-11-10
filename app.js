// app.js
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to ReTech API!');
});

let items = []; // temporary in-memory store

app.post('/items', (req, res) => {
  const item = req.body;
  item.id = items.length + 1;
  items.push(item);
  res.status(201).json({ message: 'Item added', item });
});

app.get('/items', (req, res) => {
  res.json(items);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
