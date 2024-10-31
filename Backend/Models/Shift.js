const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  shiftName: {
    type: String,
    required: true,
  },
  shiftType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Shift = mongoose.model("Shift", shiftSchema);

module.exports = Shift;
