const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  const { eventId, text } = req.body;

  try {
    const comment = await Comment.create({
      event: eventId,
      user: req.user._id,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to post comment" });
  }
};

exports.getCommentsByEvent = async (req, res) => {
  try {
    const comments = await Comment.find({ event: req.params.eventId }).populate("user", "name");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    // Find the comment by its ID
    const comment = await Comment.findById(req.params.id);

    // If the comment doesn't exist
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Ensure the user is the one who created the comment or an admin
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Remove the comment from the database
    await comment.remove();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
