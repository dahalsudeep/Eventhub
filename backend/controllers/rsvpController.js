const RSVP = require("../models/RSVP");

exports.getUserRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find({ user: req.user._id }).populate("event");
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user RSVPs", error: error.message });
  }
};


//  Get a user's RSVP status for an event
exports.getRSVP = async (req, res) => {
  try {
    // Get the user ID from authentication middleware
    const userId = req.user.id; // ✅ Corrected
    const { eventId } = req.params;

    // Find RSVP for the logged-in user and event
    const rsvp = await RSVP.findOne({ event: eventId, user: userId });

    if (!rsvp) {
      return res.status(200).json({ status: "none" }); // ✅ Return default status
    }

    res.json({ status: rsvp.status });
  } catch (error) {
    console.error("Error fetching RSVP:", error);
    res.status(500).json({ message: "Failed to fetch RSVP", error: error.message });
  }
};

exports.getEventRSVPs = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const rsvps = await RSVP.find({ event: eventId }).populate("user", "name email"); // Populate user details

    res.status(200).json(rsvps);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch RSVPs", error: error.message });
  }
};

// ✅ Create or update an RSVP
exports.updateRSVP = async (req, res) => {
  const { status } = req.body;
  const { eventId } = req.params;
  const userId = req.user._id; // Extracted from auth middleware

  try {
    let rsvp = await RSVP.findOne({ event: eventId, user: userId });

    if (rsvp) {
      rsvp.status = status;
      await rsvp.save();
    } else {
      rsvp = await RSVP.create({
        event: eventId,
        user: userId,
        status,
      });
    }

    res.status(201).json(rsvp);
  } catch (error) {
    res.status(500).json({ message: "RSVP failed", error: error.message });
  }
};

// ✅ Get all RSVPs for an event
exports.getRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find({ event: req.params.eventId }).populate("user", "name email");
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch RSVPs", error: error.message });
  }
};

// ✅ Delete a user's RSVP for an event
exports.deleteRSVP = async (req, res) => {
  try {
    const rsvp = await RSVP.findOneAndDelete({ event: req.params.eventId, user: req.user._id });

    if (!rsvp) {
      return res.status(404).json({ message: "RSVP not found or unauthorized" });
    }

    res.json({ message: "RSVP removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove RSVP", error: error.message });
  }
};
