const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// 📌 Register new complaint
router.post("/register", async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json({
      message: "Complaint registered successfully",
      complaintId: complaint._id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 Track complaint by ID
router.get("/track/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({
      status: complaint.status,
      details: complaint
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid Complaint ID" });
  }
});

module.exports = router;
