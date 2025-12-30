const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintId: String,
  name: String,
  mobile: String,
  email: String,
  location: String,
  type: String,
  description: String,
  status: {
    type: String,
    default: "Submitted"
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);
