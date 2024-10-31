const express = require("express");
const router = express.Router();
const Schedule = require("../Models/Schedule");

// POST route to create a new schedule
router.post("/", async (req, res) => {
  const { scheduleName, scheduleYear, scheduleType } = req.body;

  try {
    // Validate the schedule type
    if (!["Annual Rotation Schedule", "Call and Shift Schedule"].includes(scheduleType)) {
      return res.status(400).json({ message: "Invalid schedule type" });
    }

    // Create a new schedule instance
    const newSchedule = new Schedule({
      scheduleName,
      scheduleYear,
      scheduleType,
    });

    // Save the new schedule to the database
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ message: "Failed to create schedule", error });
  }
});

// GET route to retrieve schedules, optionally filtered by type
router.get("/", async (req, res) => {
  const { type } = req.query;

  try {
    let schedules;

    // If no type is provided, retrieve all schedules
    if (!type) {
      schedules = await Schedule.find();
    } else {
      // Validate the provided schedule type
      if (!["Annual Rotation Schedule", "Call and Shift Schedule"].includes(type)) {
        return res.status(400).json({ message: "Invalid schedule type" });
      }
      // Retrieve schedules filtered by type
      schedules = await Schedule.find({ scheduleType: type });
    }

    // Send the retrieved schedules as the response
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error retrieving schedules:", error);
    res.status(500).json({ message: "Failed to retrieve schedules", error });
  }
});

module.exports = router;
