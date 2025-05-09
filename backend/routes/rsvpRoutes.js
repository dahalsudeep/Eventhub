const express = require("express");
const { protect, verifyAdmin } = require("../middleware/authMiddleware");
const { getRSVP, updateRSVP, getRSVPs, deleteRSVP, getUserRSVPs, getEventRSVPs } = require("../controllers/rsvpController");

const router = express.Router();

// Fetch all RSVPs for logged-in user
router.get("/my-rsvps", protect, getUserRSVPs);

// Get single RSVP for a user (no need for userId param since we use the logged-in user)
router.get("/:eventId/rsvp", protect, getRSVP); // Get single RSVP

// Update/Create RSVP for an event
router.put("/:eventId/rsvp", protect, updateRSVP); // Update/Create RSVP

// Get all RSVPs for an event
router.get("/:eventId/rsvps", protect, getRSVPs); // Get all RSVPs for event

// Delete RSVP for a user (no need for userId param, uses logged-in user)
router.delete("/:eventId/rsvp", protect, deleteRSVP); // Delete RSVP

module.exports = router;
