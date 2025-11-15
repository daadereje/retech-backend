const express = require("express");
const router = express.Router();
const Repair = require("../models/Repair");

// Create repair request
router.post("/", async (req, res) => {
    try {
        const repair = await Repair.create(req.body);
        res.status(201).json({ message: "Repair created", repair });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all repair requests
router.get("/", async (req, res) => {
    try {
        const repairs = await Repair.find();
        res.json(repairs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
