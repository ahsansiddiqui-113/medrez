const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pager: { type: String, default: "n/a" },
    year: { type: String },
    level: { type: String },
    sequence: { type: String },
    isDeleted: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resident", ResidentSchema);
