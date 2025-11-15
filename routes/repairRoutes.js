const express = require("express");
const router = express.Router();
const { createRepair, getRepairs } = require("../controllers/repairController");

router.post("/", createRepair);
router.get("/", getRepairs);

module.exports = router;
