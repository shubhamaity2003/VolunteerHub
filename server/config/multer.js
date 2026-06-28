const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profile") {
      cb(null, "uploads/profiles");
    } else if (file.fieldname === "resume") {
      cb(null, "uploads/resumes");
    } else if (file.fieldname === "certificate") {
      cb(null, "uploads/certificates");
    }
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only Images and PDF files are allowed"));
  }
};

module.exports = multer({
  storage,
  fileFilter,
});