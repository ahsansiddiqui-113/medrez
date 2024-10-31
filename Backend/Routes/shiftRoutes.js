const express = require("express");
const router = express.Router();
const shiftController = require("../controller/shiftController");

router.get("/", shiftController.getShifts);
router.post("/", shiftController.createShift);
router.delete("/:id", shiftController.deleteShift); 

module.exports = router;
