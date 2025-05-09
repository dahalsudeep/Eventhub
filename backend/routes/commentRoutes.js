const express = require("express");
const { createComment, getCommentsByEvent, deleteComment } = require("../controllers/commentController"); // Import the correct functions
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to create a new comment
router.post("/", protect, createComment);

// Route to get comments for a specific event
router.get("/:eventId", getCommentsByEvent);

// Route to delete a comment
router.delete("/:id", protect, deleteComment); // Ensure the correct controller method is used

module.exports = router;
