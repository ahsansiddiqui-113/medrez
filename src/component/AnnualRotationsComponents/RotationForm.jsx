import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios for making API requests
import NewTallyForm from "./NewTallyForm"; // Assume this component exists

const RotationForm = ({ selectedRotationId, onSave }) => {
  const [rotationName, setRotationName] = useState("");
  const [rotationColor, setRotationColor] = useState("#FF0707");
  const [staffingRequirements, setStaffingRequirements] = useState([]);
  const [vacations, setVacations] = useState("Allowed");
  const [blockSets, setBlockSets] = useState("Allowed");
  const [tallies, setTallies] = useState([]);
  const [showTallyForm, setShowTallyForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedRotationId) {
      const fetchRotationData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/rotations/${selectedRotationId}`
          );
          const data = response.data;

          setRotationName(data.name);
          setRotationColor(data.color);
          setStaffingRequirements(data.staffingRequirements);
          setVacations(data.vacations);
          setBlockSets(data.blockSets);
          setTallies(data.tallies);
        } catch (error) {
          setErrorMessage("Error fetching rotation data");
          console.error("Error fetching rotation data:", error);
        }
      };
      fetchRotationData();
    } else {
      resetForm();
    }
  }, [selectedRotationId]);

  const resetForm = () => {
    setRotationName("");
    setRotationColor("#FF0707");
    setStaffingRequirements([]);
    setVacations("Allowed");
    setBlockSets("Allowed");
    setTallies([]);
  };

  const handleStaffingChange = (level) => {
    setStaffingRequirements((prev) =>
      prev.includes(level)
        ? prev.filter((req) => req !== level)
        : [...prev, level]
    );
  };

  const handleAddTally = () => {
    setShowTallyForm(!showTallyForm);
  };

  const handleTallyChange = (index, field, value) => {
    const updatedTallies = [...tallies];
    updatedTallies[index][field] = value;
    setTallies(updatedTallies);
  };

  const handleSave = async () => {
    if (!rotationName.trim()) {
      setErrorMessage("Rotation Name is required.");
      return;
    }

    const updatedRotation = {
      name: rotationName,
      color: rotationColor,
      staffingRequirements,
      vacations,
      blockSets,
      tallies,
    };

    try {
      setErrorMessage(""); // Clear previous errors

      if (selectedRotationId) {
        // Update existing rotation
        await axios.put(
          `http://localhost:5000/api/rotations/${selectedRotationId}`,
          updatedRotation
        );
      } else {
        // Create new rotation
        await axios.post(
          "http://localhost:5000/api/rotations",
          updatedRotation
        );
      }

      onSave(updatedRotation); // Notify parent component on save
      resetForm();
    } catch (error) {
      setErrorMessage("Error saving rotation data.");
      console.error("Error saving rotation data:", error);
    }
  };

  return (
    <div className="rotation-form bg-white p-6 rounded-lg flex flex-col gap-5">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded"
            style={{ backgroundColor: rotationColor }}
          ></div>
          <h2>{rotationName || "New Rotation"}</h2>
        </div>
        <button
          onClick={handleSave}
          className="bg-MedrezGreen text-white py-3 px-5 rounded-md font-semibold"
        >
          Save
        </button>
      </div>
      <hr />
      <div className="flex flex-col gap-3">
        <p>Edit Rotation</p>
        <div className="flex gap-7">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rotation Name:
            </label>
            <input
              type="text"
              value={rotationName}
              onChange={(e) => setRotationName(e.target.value)}
              className="mt-1 p-2 block w-full h-[48px] bg-MedrezLightGray rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Color:
            </label>
            <input
              type="color"
              value={rotationColor}
              onChange={(e) => setRotationColor(e.target.value)}
              className="mt-1 block w-[48px] rounded-lg h-[48px]"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="mb-4 w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Staffing Requirements:
          </label>
          <div className="mt-2 flex flex-wrap gap-3">
            {[
              "PGY-1",
              "PGY-2",
              "PGY-3",
              "PGY-4",
              "PGY-5",
              "PGY-6",
              "PGY-7",
              "Intern",
              "Fellow",
              "Attending",
              "Other",
            ].map((level) => (
              <button
                key={level}
                onClick={() => handleStaffingChange(level)}
                className={`px-4 py-2 rounded-md ${
                  staffingRequirements.includes(level)
                    ? "bg-green-500 text-white font-bold"
                    : "bg-MedrezLightGray text-black"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-[50%]">
          <div className="mb-4 ">
            <label className="block text-sm font-medium text-gray-700">
              Vacations:
            </label>
            <select
              value={vacations}
              onChange={(e) => setVacations(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md h-[48px] bg-MedrezLightGray "
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Block Sets:
            </label>
            <select
              value={blockSets}
              onChange={(e) => setBlockSets(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md h-[48px] bg-MedrezLightGray"
            >
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      {/* Tallies Section */}
      <div className="mb-6 flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 flex gap-1 items-center">
          Tallies:{" "}
          <p>
            (3 in the View){" "}
            <button className="text-MedrezBlue text-lg underline">
              Show All Tallies
            </button>
          </p>
        </label>

        <div className="relative">
          <button
            onClick={handleAddTally}
            className="mt-2 bg-MedrezGreen text-white px-4 py-2 rounded-md"
          >
            Add New Tally
          </button>
          {showTallyForm && (
            <div className="absolute w-[500px] right-0 top-[80px]">
              <NewTallyForm setShowTallyForm={setShowTallyForm} />
            </div>
          )}
        </div>
      </div>

      {tallies.map((tally, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-sm font-medium text-gray-700">
            {tally.name}:
          </label>
          <input
            type="text"
            value={tally.value}
            onChange={(e) => handleTallyChange(index, "value", e.target.value)}
            className="mt-1 p-2 block w-full bg-MedrezLightGray rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default RotationForm;
