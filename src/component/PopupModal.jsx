import axios from "axios";
import { useState } from "react";
import { useSchedule } from "./context/ScheduleContext";

function PopupModal({ FormName }) {
  const [showModal, setShowModal] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    scheduleName: "",
    scheduleYear: "Jul 1 2025 - Jun 30 2026", // Initial Year Range
    scheduleType: FormName,
  });
  const { setAnnualRotationData } = useSchedule();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const handleYearChange = (direction) => {
    const currentYear = parseInt(scheduleData.scheduleYear.slice(-4)); 
    let newYear;

    if (direction === "prev") {
      newYear = currentYear - 1;
    } else if (direction === "next") {
      newYear = currentYear + 1;
    }

    setScheduleData({
      ...scheduleData,
      scheduleYear: `Jul 1 ${newYear - 1} - Jun 30 ${newYear}`,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adjustedScheduleType = scheduleData.scheduleType === "Annual Rotations Schedule" 
      ? "Annual Rotation Schedule" 
      : scheduleData.scheduleType;

    const payload = { ...scheduleData, scheduleType: adjustedScheduleType };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/schedules",
        payload
      );

      setAnnualRotationData((prevData) => [...prevData, response.data]); 
      alert(`${FormName} Added Successfully!`);
    } catch (error) {
      console.error("Error adding the schedule:", error.response?.data || error.message);
    }

    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setScheduleData({
      scheduleName: "",
      scheduleYear: "Jul 1 2024 - Jun 30 2025",
      scheduleType: FormName,
    });
  };

  return (
    <div className="relative flex justify-center items-center">
      <button
        className="bg-MedrezGreen text-white py-2 px-4 rounded-md hover:bg-MedrezGreenHover"
        onClick={() => setShowModal(true)}
      >
        Add {FormName}
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md mx-auto rounded-[20px] shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => {
                resetForm();
                setShowModal(false);
              }}
            >
              Close
            </button>

            <h2 className="text-[24px] font-semibold mb-4">Add {FormName} Schedule</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 flex items-center gap-1">
                  Schedule Name:
                  <span className="text-gray-400">?</span> 
                </label>
                <input
                  type="text"
                  name="scheduleName"
                  value={scheduleData.scheduleName}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-4 py-4 border-none bg-MedrezLightGray rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 flex items-center gap-1">
                  Schedule Year:
                  <span className="text-gray-400">?</span>
                </label>
                <div className="flex items-center justify-between bg-MedrezLightGray rounded-md px-4 py-4">
                  <button
                    type="button"
                    className="text-black"
                    onClick={() => handleYearChange("prev")}
                  >
                    &lt;
                  </button>
                  <span>{scheduleData.scheduleYear}</span>
                  <button
                    type="button"
                    className="text-black"
                    onClick={() => handleYearChange("next")}
                  >
                    &gt;
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Add Schedule
                </button>
                <button
                  type="button"
                  className="bg-[#C7C7C7] text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupModal;
