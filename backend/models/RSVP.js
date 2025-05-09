const mongoose = require("mongoose");

const RSVP_SCHEMA = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["accepted", "pending", "declined"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("RSVP", RSVP_SCHEMA);
