const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const protect = require("../middleware/authMiddleware");

router.post(
  "/profile",
  protect,
  upload.single("profile"),
  (req, res) => {
    res.json({
      success: true,
      file: req.file.filename,
    });
  }
);

router.post(
  "/resume",
  protect,
  upload.single("resume"),
  (req, res) => {
    res.json({
      success: true,
      file: req.file.filename,
    });
  }
);

router.post(
  "/certificate",
  protect,
  upload.single("certificate"),
  (req, res) => {
    res.json({
      success: true,
      file: req.file.filename,
    });
  }
);

module.exports = router;