const Volunteer = require("../models/Volunteer");

const getDashboard = async (req, res) => {
  try {

    const volunteer = await Volunteer.findOne({
      user: req.user.id,
    }).populate("user", "name email");

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer profile not found",
      });
    }

    res.json({
      success: true,
      volunteer,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  getDashboard,
};