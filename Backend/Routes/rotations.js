const express = require("express");
const Rotation = require("../Models/Rotations");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rotations = await Rotation.find();
    res.status(200).json(rotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const rotation = await Rotation.findById(req.params.id);
    if (!rotation) {
      return res.status(404).json({ message: "Rotation not found" });
    }
    res.status(200).json(rotation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:year/:name", async (req, res) => {
  const { year, name } = req.params;
  const { newYear, newName } = req.body;

  try {
    let rotation = await Rotation.findOne({ year, name });
    
    if (!rotation) {
      return res.status(404).json({ message: "Rotation not found" });
    }

    rotation.year = newYear || rotation.year;
    rotation.name = newName || rotation.name;
    await rotation.save();

    res.status(200).json({ message: "Rotation updated successfully", rotation });
  } catch (error) {
    res.status(500).json({ message: "Error updating rotation", error });
  }
});

router.post("/", async (req, res) => {
  const rotation = new Rotation({
    name: req.body.name,
    color: req.body.color,
    staffingRequirements: req.body.staffingRequirements,
    vacations: req.body.vacations,
    blockSets: req.body.blockSets,
    tallies: req.body.tallies,
  });

  try {
    const newRotation = await rotation.save();
    res.status(201).json(newRotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRotation = await Rotation.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        color: req.body.color,
        staffingRequirements: req.body.staffingRequirements,
        vacations: req.body.vacations,
        blockSets: req.body.blockSets,
        tallies: req.body.tallies,
      },
      { new: true }
    );

    if (!updatedRotation) {
      return res.status(404).json({ message: "Rotation not found" });
    }

    res.status(200).json(updatedRotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rotation = await Rotation.findByIdAndDelete(req.params.id);

    if (!rotation) {
      return res.status(404).json({ message: "Rotation not found" });
    }

    res.status(200).json({ message: "Rotation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
