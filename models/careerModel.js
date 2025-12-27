const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    role: { type: String, required: true },
    experience: { type: String },
    message: { type: String },
    resume: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);
