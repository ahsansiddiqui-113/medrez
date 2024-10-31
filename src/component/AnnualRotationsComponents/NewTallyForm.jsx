import { form } from "framer-motion/client";
import React, { useState } from "react";

const NewTallyForm = ({ setShowTallyForm }) => {
  // State for toggling between tabs (New Tally / Reuse Tally)
  const [activeTab, setActiveTab] = useState("newTally");

  // State for default target values
  const [targets, setTargets] = useState([
    { role: "PGY-1", value: "2", condition: "Only this Schedule" },
    { role: "PGY-2", value: "2", condition: "Including Prev" },
  ]);

  // Handlers for adding and removing target rows
  const removeTarget = (index) => {
    setTargets(targets.filter((_, i) => i !== index));
  };

  const rotationTallyData = [
    {
      TallyBeingReused: {
        name: "Cardiology",
        color: "#f00",
      },
      TallyBeingCreated: {
        name: "Cardiology",
        color: "#f00",
      },
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg">
      <h2 className="mb-5 text-lg font-semibold">Create New Tally</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("newTally")}
          className={`py-2 px-4 rounded-lg ${
            activeTab === "newTally"
              ? "bg-MedrezBlue text-white"
              : "bg-gray-200"
          }`}
        >
          New Tally
        </button>
        <button
          onClick={() => setActiveTab("reuseTally")}
          className={`py-2 px-4 rounded-lg ${
            activeTab === "reuseTally"
              ? "bg-MedrezBlue text-white"
              : "bg-gray-200"
          }`}
        >
          Reuse Tally
        </button>
      </div>

      {activeTab === "newTally" ? (
        <form className="space-y-4">
          {/* Inputs for Tally Name and Rotations */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Tally Name
              </label>
              <select className="mt-1 block w-full bg-gray-100 rounded-md p-2">
                <option>Select</option>
                {/* Add other options */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rotations
              </label>
              <select className="mt-1 block w-full bg-gray-100 rounded-md p-2">
                <option>Select</option>
                {/* Add other options */}
              </select>
            </div>
          </div>

          {/* Count Mode and Continues */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Count Mode
              </label>
              <select className="mt-1 block w-full bg-gray-100 rounded-md p-2">
                <option>Blocks</option>
                {/* Add other options */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Continues
              </label>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-600 mr-2">
                  No Previous Tally Selected
                </p>
                <a href="#" className="text-blue-600 text-sm">
                  Change
                </a>
              </div>
            </div>
          </div>

          {/* Target Selection */}
          <div>
            <p className="block text-sm font-medium text-gray-700">
              Set Targets:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "PGY-7",
                "PGY-6",
                "PGY-5",
                "PGY-4",
                "PGY-3",
                "PGY-2",
                "PGY-1",
                "Intern",
                "Fellow",
                "Attending",
                "Other",
              ].map((role) => (
                <button
                  key={role}
                  className={`px-4 py-1 rounded-md ${
                    role === "PGY-2" ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Default Target List */}
          <div className="space-y-2">
            {targets.map((target, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-1/4">
                  <p className="text-sm">{target.role}</p>
                </div>
                <input
                  type="text"
                  className="w-12 p-1 rounded-md bg-gray-100"
                  defaultValue={target.value}
                />
                <select className="w-1/2 p-2 bg-gray-100 rounded-md">
                  <option>{target.condition}</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeTarget(index)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* Cancel and Save Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="text-gray-700"
              onClick={() => {
                setShowTallyForm(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-md"
              onClick={() => {
                setShowTallyForm(false);
              }}
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <form>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pick Schedule:
                </label>
                <select className="mt-1 block w-full bg-gray-100 rounded-md p-2">
                  <option>Select</option>
                  {/* Add other options */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pick Tally to reuse:
                </label>
                <select className="mt-1 block w-full bg-gray-100 rounded-md p-2">
                  <option>Select</option>
                  {/* Add other options */}
                </select>
              </div>
            </div>
            <table className="min-w-full border border-gray-300 mt-7">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 border border-gray-300">
                    Resident Year
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 border border-gray-300">
                    Targets
                  </th>
                </tr>
              </thead>
              <tbody>
                {rotationTallyData.map((row, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded"
                          style={{
                            backgroundColor: row.TallyBeingReused.color,
                          }}
                        ></div>
                        <h2>{row.TallyBeingReused.name}</h2>
                      </div>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded"
                          style={{
                            backgroundColor: row.TallyBeingCreated.color,
                          }}
                        ></div>
                        <h2>{row.TallyBeingCreated.name}</h2>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="text-gray-700"
              onClick={() => {
                setShowTallyForm(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-md"
              onClick={() => {
                setShowTallyForm(false);
              }}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewTallyForm;
