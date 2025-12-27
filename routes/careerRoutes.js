const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  applyCareer,
  getAllCareers
} = require("../controllers/careerController");

const router = express.Router();

/* ===============================
   MULTER CONFIG
================================ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(/\s+/g, "")
    );
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX files allowed"));
  }
};

const upload = multer({ storage, fileFilter });

/* ===============================
   ROUTES
================================ */
router.post("/uploads", upload.single("resume"), applyCareer);
router.get("/career", getAllCareers);

module.exports = router;
