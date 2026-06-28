const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getAllVolunteers,
  updateVolunteerStatus,
  deleteVolunteer,
} = require("../controllers/adminController");

router.get(
  "/volunteers",
  protect,
  authorize("admin"),
  getAllVolunteers
);

router.put(
  "/volunteers/:id",
  protect,
  authorize("admin"),
  updateVolunteerStatus
);

router.delete(
  "/volunteers/:id",
  protect,
  authorize("admin"),
  deleteVolunteer
);

module.exports = router;