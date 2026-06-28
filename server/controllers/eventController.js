const Event = require("../models/Event");

// ===============================
// Create Event
// ===============================
const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Get All Events
// ===============================
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .populate("registeredVolunteers", "name email");

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Get Single Event
// ===============================
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("registeredVolunteers", "name email");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Update Event
// ===============================
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Delete Event
// ===============================
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Join Event
// ===============================
const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (
      event.registeredVolunteers.some(
        (id) => id.toString() === req.user.id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Already joined this event",
      });
    }

    if (
      event.registeredVolunteers.length >=
      event.maxParticipants
    ) {
      return res.status(400).json({
        success: false,
        message: "Event is full",
      });
    }

    event.registeredVolunteers.push(req.user.id);

    await event.save();

    res.json({
      success: true,
      message: "Successfully joined the event",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Leave Event
// ===============================
const leaveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    event.registeredVolunteers =
      event.registeredVolunteers.filter(
        (id) => id.toString() !== req.user.id
      );

    await event.save();

    res.json({
      success: true,
      message: "Left the event successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
};