const Career = require("../models/careerModel");

/* ===============================
   APPLY FOR JOB
================================ */
exports.applyCareer = async (req, res) => {
  try {
    const { fullName, email, contact, role, experience, message } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required"
      });
    }

    const application = await Career.create({
      fullName,
      email,
      contact,
      role,
      experience,
      message,
      resume: req.file.path
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ===============================
   GET ALL APPLICATIONS (ADMIN)
================================ */
exports.getAllCareers = async (req, res) => {
  try {
    const applications = await Career.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
