const Shift = require("../models/Shift");

exports.getShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shifts", error });
  }
};

exports.createShift = async (req, res) => {
  const { shiftName, shiftType, date, startTime, endTime } = req.body;

  const newShift = new Shift({
    shiftName,
    shiftType,
    date,
    startTime,
    endTime,
  });

  try {
    const savedShift = await newShift.save();
    res.status(201).json(savedShift);
  } catch (error) {
    res.status(400).json({ message: "Error creating shift", error });
  }
};

exports.deleteShift = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedShift = await Shift.findByIdAndDelete(id); 
    if (!deletedShift) {
      return res.status(404).json({ message: "Shift not found" });
    }
    res.status(200).json({ message: "Shift deleted successfully", deletedShift });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shift", error });
  }
};
