import React, { useState } from "react";

const SettingsTab = () => {
  const [scheduleName, setScheduleName] = useState("Master Schedule");
  const [academicYear, setAcademicYear] = useState("2024 - 2025");
  const [showModal, setShowModal] = useState(true); // Assuming showModal state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "scheduleName") {
      setScheduleName(value);
    } else if (name === "academicYear") {
      setAcademicYear(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Schedule Name: ${scheduleName}, Academic Year: ${academicYear}`
    );
    // Handle form submission logic here
    // Optionally, close modal or navigate away
  };

  return (
    <div className="p-10 min-h-screen">
      <div className="flex gap-16 w-full justify-between">
        <form onSubmit={handleSubmit} className="w-[500px]">
          <h3 className="font-semibold text-xl mb-7">Basic Settings</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Schedule Name:</label>
            <input
              type="text"
              name="scheduleName"
              value={scheduleName}
              onChange={handleInputChange}
              placeholder="Enter schedule name"
              className="w-full px-4 py-4 border-none bg-MedrezLightGray rounded-md 
                       focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Schedule Year:</label>
            <input
              type="text"
              name="academicYear"
              value={academicYear}
              readOnly
              className="w-full px-4 py-4 border-none text-black bg-MedrezLightGray 
                       rounded-md focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md 
                       hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-[#C7C7C7] text-white px-4 py-2 rounded-md 
                       hover:bg-gray-600"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="mt-8 p-4 bg-yellow-100 rounded-md w-[400px]">
          <h3 className="font-bold">Note:</h3>
          <p className="text-gray-700">
            Changing this on an existing schedule is almost never a good idea.
            To work on a new year’s schedule please create a new schedule. Read
            all about Schedule Years and the Academic Year in the Schedule
            Maker's Guide.
          </p>
        </div>
      </div>

      {/* Note Section */}

      {/* Publishing Section */}
      <div className="mt-8">
        <h3 className="font-semibold text-xl">Publishing</h3>
        <p className="text-blue-600">Publishing Settings</p>
      </div>

      {/* Customer Support Section */}
      <div className="mt-4 p-4 bg-yellow-100 rounded-md">
        <h3 className="font-bold">Customer Support</h3>
        <p className="text-gray-700">
          Publishing must be enabled for your account before you can publish
          this schedule. To enable publishing for your account go to the Home
          Page and click the Settings Button.
        </p>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
          Go to Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
