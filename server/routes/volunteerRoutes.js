const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createVolunteer,
  getMyProfile,
  updateVolunteer,
} = require("../controllers/volunteerController");

router.post("/", protect, createVolunteer);

router.get("/me", protect, getMyProfile);

router.put("/me", protect, updateVolunteer);

module.exports = router;