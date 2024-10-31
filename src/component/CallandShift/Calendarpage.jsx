import React, { useState } from "react";
import axios from "axios";
import Calendar from "./Calendar";

const CalendarPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newBlock, setNewBlock] = useState({
    blockName: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");

  const handleAddBlock = () => {
    if (!newBlock.blockName || !newBlock.startDate || !newBlock.endDate) {
      setError("All fields are required.");
      return;
    }

    axios
      .post("mongodb://localhost:27017/medrez/api/shiftblocks", newBlock) 
      .then((response) => {
        console.log("Block added:", response.data);
        setModalVisible(false);
        setNewBlock({ blockName: "", startDate: "", endDate: "" });
        setError("");
      })
      .catch((error) => console.error("Error adding block:", error));
  };

  return (
    <div className="flex min-h-screen text-black">
      <div className="w-full p-10">
        <h1 className="text-2xl font-bold text-teal-500 mb-2">Monthly 2024 - 2025</h1>
        <h2 className="text-lg font-semibold mb-4">Blocks Date</h2>
        <button
          className="mt-4 px-4 py-2 bg-green-500 rounded-full hover:bg-green-600"
          onClick={() => setModalVisible(true)}
        >
          Add / Edit Block Dates
        </button>

        {modalVisible && (
          <div className="modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Add/Edit Block</h2>
              {error && <p className="text-red-500">{error}</p>}
              <input
                type="text"
                placeholder="Block Name"
                value={newBlock.blockName}
                onChange={(e) =>
                  setNewBlock({ ...newBlock, blockName: e.target.value })
                }
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="date"
                value={newBlock.startDate}
                onChange={(e) =>
                  setNewBlock({ ...newBlock, startDate: e.target.value })
                }
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="date"
                value={newBlock.endDate}
                onChange={(e) =>
                  setNewBlock({ ...newBlock, endDate: e.target.value })
                }
                className="mb-2 p-2 border rounded w-full"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleAddBlock}
                  className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                >
                  Save Block
                </button>
                <button
                  onClick={() => setModalVisible(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full p-6 bg-white text-black">
        <h2 className="text-lg font-semibold mb-4">Calendar</h2>
        <Calendar />
      </div>
    </div>
  );
};

export default CalendarPage;
