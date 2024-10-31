import React, { useState } from "react";

function Modal({ isOpen, onClose, onAddShiftRow }) {
  const [shiftData, setShiftData] = useState({
    shiftName: "",
    shiftType: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShiftData({ ...shiftData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddShiftRow(shiftData);
    setShiftData({ shiftName: "", shiftType: "", date: "", startTime: "", endTime: "" });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
          <button
            className="absolute top-3 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4">Add Shift</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="shiftName"
              placeholder="Shift Name"
              value={shiftData.shiftName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <select
              name="shiftType"
              value={shiftData.shiftType}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mb-3"
            >
              <option value="" disabled>Select Shift Type</option>
              <option value="in-house">In-House</option>
              <option value="out-house">Out-House</option>
              <option value="clinic">Clinic</option>
            </select>


            <input
              type="date"
              name="date"
              value={shiftData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <input
              type="time"
              name="startTime"
              value={shiftData.startTime}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <input
              type="time"
              name="endTime"
              value={shiftData.endTime}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <button
              type="submit"
              className="w-full py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition duration-200"
            >
              Add Shift
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
