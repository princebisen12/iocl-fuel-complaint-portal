const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Get all complaints (ADMIN ONLY)
router.get("/complaints", protect, adminOnly, async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// Update complaint status (ADMIN ONLY)
router.put("/complaints/:id", protect, adminOnly, async (req, res) => {
  await Complaint.findOneAndUpdate(
    { complaintId: req.params.id },
    { status: req.body.status }
  );

  res.json({ message: "Status updated" });
});

module.exports = router; // ✅ VERY IMPORTANT
