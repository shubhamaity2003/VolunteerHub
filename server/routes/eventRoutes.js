const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
} = require("../controllers/eventController");

// ============================
// Public Routes
// ============================

// Get all events
router.get("/", getEvents);

// Get single event
router.get("/:id", getEventById);

// ============================
// Protected Routes
// ============================

// Create event
router.post("/", protect, createEvent);

// Update event
router.put("/:id", protect, updateEvent);

// Delete event
router.delete("/:id", protect, deleteEvent);

// Join event
router.post("/:id/join", protect, joinEvent);

// Leave event
router.delete("/:id/leave", protect, leaveEvent);

module.exports = router;