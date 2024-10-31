const mongoose = require("mongoose");

const tallySchema = new mongoose.Schema({
  residentYear: String,
  target: String,
});

const rotationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, default: "#FF0707" },
  staffingRequirements: [String],
  isDeleted: { type: Boolean, default: false },
  vacations: {
    type: String,
    enum: ["Allowed", "Not Allowed"],
    default: "Allowed",
  },
  blockSets: {
    type: String,
    enum: ["Allowed", "Not Allowed"],
    default: "Allowed",
  },
  tallies: [tallySchema],
});

module.exports = mongoose.model("Rotation", rotationSchema);
