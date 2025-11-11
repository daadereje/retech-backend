const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  address: String,
  contact: String
});

module.exports = mongoose.model('Repair', repairSchema);
