const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

router.post("/register", async (req, res) => {
  console.log("🔥 REGISTER API HIT 🔥");
  console.log("Request Body:", req.body);

  try {
    const complaintId = "IOCL" + Math.floor(100000 + Math.random() * 900000);

    const complaint = new Complaint({
      complaintId,
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      location: req.body.location,
      type: req.body.type,
      description: req.body.description
    });

    await complaint.save();

    console.log("✅ Complaint saved to DB");

    res.json({
      message: "Complaint Registered Successfully",
      complaintId
    });
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/track/:id", async (req, res) => {
  const complaint = await Complaint.findOne({ complaintId: req.params.id });

  if (!complaint) {
    return res.json({ message: "Complaint not found" });
  }

  res.json(complaint);
});

module.exports = router;
