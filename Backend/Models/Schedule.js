const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  scheduleName: {
    type: String,
    required: true,
  },
  scheduleYear: {
    type: String,
    required: true,
  },
  scheduleType: {
    type: String,
    enum: ["Annual Rotation Schedule", "Call and Shift Schedule"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
