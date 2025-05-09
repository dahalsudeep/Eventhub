const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createEvent, getEvents , getEventById, updateEvent, deleteEvent} = require("../controllers/eventController");

const router = express.Router();
router.post("/", protect, createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById); 
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);


module.exports = router;
