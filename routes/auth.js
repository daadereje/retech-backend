const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register admin (ONLY FOR FIRST TIME)
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if admin already exists
        let admin = await Admin.findOne({ email });
        if (admin) return res.status(400).json({ message: "Admin already exists" });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create admin
        admin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // create JWT token
        const token = jwt.sign(
            { id: admin._id },
            "secret123", // later we will move this to env file
            { expiresIn: "7d" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
