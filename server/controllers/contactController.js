const Contact = require("../models/Contact");

// Create Message
const createMessage = async (req, res) => {
  try {
    const message = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      contact: message,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Get All Messages
const getMessages = async (req, res) => {

  try {

    const messages = await Contact.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      messages,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// Delete Message
const deleteMessage = async (req, res) => {

  try {

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Message deleted.",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};