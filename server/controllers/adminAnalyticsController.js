const Volunteer = require("../models/Volunteer");
const Event = require("../models/Event");

const getAnalytics = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    const events = await Event.find();

    const totalVolunteers = volunteers.length;

    const approved = volunteers.filter(
      (v) => v.status === "Approved"
    ).length;

    const pending = volunteers.filter(
      (v) => v.status === "Pending"
    ).length;

    const rejected = volunteers.filter(
      (v) => v.status === "Rejected"
    ).length;

    const totalEvents = events.length;

    const totalRegistrations = events.reduce(
      (total, event) =>
        total + event.registeredVolunteers.length,
      0
    );

    res.json({
      success: true,
      analytics: {
        totalVolunteers,
        approved,
        pending,
        rejected,
        totalEvents,
        totalRegistrations,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAnalytics,
};