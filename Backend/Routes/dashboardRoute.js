const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/middleware'); // importing middlewares
const Schedule = require('../Models/Schedule'); // assuming you have a Schedule model
const Resident = require('../Models/Resident'); // assuming you have a Resident model

// Main dashboard route - accessible to authenticated users
router.get('/', authMiddleware, async (req, res) => {
  try {
    const onNowData = await Schedule.find({ status: 'ongoing' }); // Fetch ongoing schedules
    const schedulesData = await Schedule.find(); // Fetch all schedules
    const residentsData = await Resident.find(); // Fetch all residents
    
    res.json({
      onNow: onNowData,
      schedules: schedulesData,
      residents: residentsData,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error while fetching dashboard data" });
  }
});

// Protected route for updating schedule - accessible to admins only
router.post('/update-schedule', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const { scheduleId, updateData } = req.body;

  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, updateData, { new: true });
    res.status(200).json({ message: "Schedule updated successfully", schedule: updatedSchedule });
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ message: "Server error while updating schedule" });
  }
});

// Route for managing residents - accessible to admins only
router.post('/manage-resident', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const { residentId, action, data } = req.body; // action could be 'add', 'edit', 'delete', etc.

  try {
    let resident;
    switch (action) {
      case 'add':
        resident = new Resident(data);
        await resident.save();
        res.status(201).json({ message: "Resident added successfully", resident });
        break;
      case 'edit':
        resident = await Resident.findByIdAndUpdate(residentId, data, { new: true });
        res.status(200).json({ message: "Resident updated successfully", resident });
        break;
      case 'delete':
        await Resident.findByIdAndDelete(residentId);
        res.status(200).json({ message: "Resident deleted successfully" });
        break;
      default:
        res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    console.error("Error managing resident:", error);
    res.status(500).json({ message: "Server error while managing resident" });
  }
});

module.exports = router;
