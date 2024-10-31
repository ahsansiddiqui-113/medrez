const express = require("express");
const router = express.Router();
const Resident = require("../Models/Resident");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to generate JWT token
const generateToken = (resident) => {
  return jwt.sign({ id: resident._id, email: resident.email, role: "resident" }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Create a new resident
router.post("/", async (req, res) => {
  const { name, pager, year, level, sequence, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving
  const newResident = new Resident({ name, pager, year, level, sequence, email, password: hashedPassword });
  
  try {
    await newResident.save();
    
    // Automatically log in the resident after creation
    const token = generateToken(newResident); // Generate token
    res.status(201).json({ token, user: newResident }); // Send token and user data
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all residents
router.get("/", async (req, res) => {
  try {
    const residents = await Resident.find({ isDeleted: false });
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a resident
router.put("/:id", async (req, res) => {
  try {
    const updatedResident = await Resident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedResident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Soft delete a resident
router.delete("/:id", async (req, res) => {
  try {
    await Resident.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Restore a resident
router.put("/restore/:id", async (req, res) => {
  try {
    await Resident.findByIdAndUpdate(req.params.id, { isDeleted: false });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Permanently delete a resident
router.delete("/permanent/:id", async (req, res) => {
  try {
    await Resident.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
