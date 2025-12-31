const express = require("express");
const Complaint = require("../models/Complaint"); // if you have complaint model

const router = express.Router();

/* CHATBOT STATUS CHECK */
router.get("/status/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.json({ message: "Complaint not found" });
    }

    res.json({
      message: `Your complaint status is: ${complaint.status}`
    });
  } catch (err) {
    res.json({ message: "Invalid complaint ID" });
  }
});

/* CHATBOT HELP */
router.get("/help", (req, res) => {
  res.json({
    message:
      "You can register complaints, track them using ID, or check safety rules."
  });
});

module.exports = router;
