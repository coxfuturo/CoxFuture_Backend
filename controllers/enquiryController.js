const Enquiry = require('../models/enquiryModel');

// Create a new enquiry
const createEnquiry = async (req, res) => {
  try {
    const { fullName, email, contact, service, message } = req.body;

    const missingFields = [];

    if (!fullName) missingFields.push("fullName");
    if (!email) missingFields.push("email");
    if (!contact) missingFields.push("contact");
    if (!service) missingFields.push("service");
    if (!message) missingFields.push("message");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missingFields
      });
    }

    const enquiry = await Enquiry.create({
      fullName,
      email,
      contact,
      service,
      message
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all enquiries
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEnquiry, getEnquiries };
