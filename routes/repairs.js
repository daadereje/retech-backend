const express = require("express");
const router = express.Router();
const Repair = require("../models/Repair");
const adminAuth = require("../middleware/adminAuth");

// -------------------------------------
// 1) Create a repair request (Public)
// -------------------------------------
router.post("/", async (req, res) => {
    try {
        const { name, phone, deviceType, problemDescription } = req.body;

        const newRepair = await Repair.create({
            name,
            phone,
            deviceType,
            problemDescription
        });

        res.status(201).json({
            message: "Repair request created successfully",
            repair: newRepair
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// -------------------------------------
// 2) Get ALL repair requests (Admin Only)
// -------------------------------------
router.get("/", adminAuth, async (req, res) => {
    try {
        const repairs = await Repair.find().sort({ createdAt: -1 });
        res.json(repairs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// -------------------------------------
// 3) Update repair status (Admin Only)
// -------------------------------------
router.put("/:id", adminAuth, async (req, res) => {
    try {
        const { status } = req.body;

        const repair = await Repair.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!repair) {
            return res.status(404).json({ message: "Repair request not found" });
        }

        res.json({
            message: "Status updated successfully",
            repair
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// -------------------------------------
// 4) Delete a repair request (Admin Only)
// -------------------------------------
router.delete("/:id", adminAuth, async (req, res) => {
    try {
        const repair = await Repair.findByIdAndDelete(req.params.id);

        if (!repair) {
            return res.status(404).json({ message: "Repair request not found" });
        }

        res.json({ message: "Repair request deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
