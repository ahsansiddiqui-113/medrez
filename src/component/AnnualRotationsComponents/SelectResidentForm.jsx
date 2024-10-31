import axios from "axios";
import React, { useEffect, useState } from "react";

// // Define the residents array with names and their corresponding years
// const residents = [
//   { name: "Abc", year: "PGY-1" },
//   { name: "Isaac", year: "PGY-2" },
//   { name: "Ethan", year: "PGY-3" },
//   { name: "Clark", year: "PGY-4" },
//   { name: "Huraira", year: "PGY-5" },
//   { name: "Zain", year: "PGY-6" },
//   { name: "Talal", year: "Intern" },
// ];

function SelectResidentForm({ onSelect, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [residents, setResidents] = useState([]);
  const [selectedResidents, setSelectedResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const response = await axios.get("http://localhost:5000/api/residents");
      setResidents(response.data);
      console.log(residents);
    };
    fetchResidents();
  }, []);

  const handleCheckboxChange = (resident) => {
    const isSelected = selectedResidents.some(
      (r) => r.name === resident.name && r.year === resident.year
    );
    if (isSelected) {
      setSelectedResidents(
        selectedResidents.filter(
          (r) => !(r.name === resident.name && r.year === resident.year)
        )
      );
    } else {
      setSelectedResidents([...selectedResidents, resident]);
    }
  };

  const handleClose = () => {
    onSelect(selectedResidents); // Pass the selected residents to the parent
    setIsVisible(false); // Hide the form
    if (onClose) onClose(); // Close the form, if onClose is provided
  };

  const isResidentSelected = (resident) => {
    return selectedResidents.some(
      (r) => r.name === resident.name && r.year === resident.year
    );
  };

  return (
    <div className="relative">
      <button
        className="bg-MedrezGreen hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
        onClick={() => setIsVisible(!isVisible)}
      >
        Select Residents
      </button>

      {isVisible && (
        <div className="absolute mt-4 w-full min-w-[300px] p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[14px] font-semibold text-gray-800">
              Select Residents to Include
            </h2>
          </div>
          <ul className="space-y-4 h-[200px] overflow-y-auto">
            {residents.map((resident, index) => (
              <li
                key={index}
                className="flex items-center w-full border border-gray-300 py-3 px-2 rounded-lg"
              >
                <span className="flex-grow text-gray-700 text-lg font-medium">
                  {`${resident.name} (${resident.level})`}
                </span>
                <label
                  htmlFor={`${resident.name}-${resident.level}`}
                  className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded-full ${
                    isResidentSelected(resident)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {isResidentSelected(resident) && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                </label>
                <input
                  type="checkbox"
                  id={`${resident.name}-${resident.level}`}
                  className="hidden"
                  checked={isResidentSelected(resident)}
                  onChange={() => handleCheckboxChange(resident)}
                />
              </li>
            ))}
          </ul>
          <button
            className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out mt-5"
            onClick={handleClose}
            aria-label="Close"
          >
            close
          </button>
        </div>
      )}
    </div>
  );
}

export default SelectResidentForm;
