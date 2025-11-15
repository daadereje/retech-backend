const Repair = require("../models/Repair");

// Create
exports.createRepair = async (req, res) => {
  try {
    const repair = await Repair.create(req.body);
    res.status(201).json(repair);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all
exports.getRepairs = async (req, res) => {
  try {
    const repairs = await Repair.find();
    res.json(repairs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
