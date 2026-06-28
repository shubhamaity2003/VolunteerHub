const Volunteer = require("../models/Volunteer");

const createVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.create({
            ...req.body,
            user: req.user.id
        });

        res.status(201).json(volunteer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyProfile = async (req, res) => {
    try {
        const volunteer = await Volunteer.findOne({
            user: req.user.id
        }).populate("user", "name email");

        res.json(volunteer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer profile not found",
      });
    }

    res.json(volunteer);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createVolunteer,
  getMyProfile,
  updateVolunteer,
};