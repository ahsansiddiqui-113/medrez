import React, { useState } from "react";
import Layout from '../Layout';
import { Link } from "react-router-dom";


const CallShiftSetting = () => {
  const [scheduleName, setScheduleName] = useState("Monthly");
  const [academicYear, setAcademicYear] = useState("2024 - 2025");
  const [progressiveShifts, setProgressiveShifts] = useState(false);
  const [restDays, setRestDays] = useState(1);

  const handleSaveSettings = () => {
    console.log("Settings saved:", {
      scheduleName,
      academicYear,
      progressiveShifts,
      restDays,
    });
  };

  return (
    <Layout>
  <div className="w-full p-4 bg-gray-100 gap-6 overflow-hidden">
    <div className="flex-1">
      <h1 className="text-2xl font-bold">
        Monthly <span className="text-green-500">{academicYear}</span>
      </h1>
    </div>

    <div className="mt-8 bg-white p-6 rounded-md shadow-md flex-1">
      <h2 className="text-xl font-semibold">Basic Settings</h2>

      <label className="block mt-4">
        <span className="text-gray-700">Set the schedule name:</span>
        <input
          type="text"
          value={scheduleName}
          onChange={(e) => setScheduleName(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200"
          placeholder="Enter schedule name"
        />
      </label>

      <label className="block mt-4">
        <span className="text-gray-700">Set the academic year:</span>
        <div className="flex items-center space-x-2 mt-1">
          <button
            onClick={() => setAcademicYear("2023 - 2024")}
            className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 transition-colors"
            aria-label="Previous academic year"
          >
            {"<"}
          </button>
          <span className="text-lg font-medium">
            {academicYear}{" "}
            <span className="text-green-500">Current Year</span>
          </span>
          <button
            onClick={() => setAcademicYear("2025 - 2026")}
            className="bg-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 transition-colors"
            aria-label="Next academic year"
          >
            {">"}
          </button>
        </div>
      </label>

      <label className="block mt-4 flex items-center">
        <input
          type="checkbox"
          checked={progressiveShifts}
          onChange={(e) => setProgressiveShifts(e.target.checked)}
          className="mr-2"
        />
        <span className="text-gray-700">Enable Progressive Shift Schedules for the Randomizer</span>
      </label>

      <label className="block mt-4">
        <span className="text-gray-700">Number of rest days between night shifts and morning shifts:</span>
        <select
          value={restDays}
          onChange={(e) => setRestDays(parseInt(e.target.value))}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </label>

      <button
        onClick={handleSaveSettings}
        className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
      >
        Save All Settings
      </button>
    </div>

    <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-md flex-1">
      <h2 className="text-lg font-semibold text-blue-700">Note:</h2>
      <p className="text-sm text-blue-600 mt-2">
        Changing this on an existing schedule is almost never a good idea. To work on a new year's schedule, please create a new schedule. Read all about{" "}
        <a href="#" className="underline text-blue-600">Schedule Years</a> and the{" "}
        <a href="#" className="underline text-blue-600">Academic Year</a>{" "}
        in the Schedule Maker's Guide.
      </p>
    </div>

    <div className="mt-8 bg-yellow-50 p-6 rounded-md shadow-md flex-1">
      <h2 className="text-lg font-semibold">Publishing Settings</h2>
      <div className="bg-yellow-100 p-4 mt-2 rounded-md">
        <h3 className="font-semibold">Customer Support</h3>
        <p className="text-sm text-yellow-800 mt-2">
          Publishing must be enabled for your account before you can publish this schedule. To enable publishing for your account, go to the Home Page and click the Settings Buttons. Read all about publishing in the Schedule Maker’s Guide.
        </p>
        <Link to="/settings">
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            Go to Settings
          </button>
        </Link>
      </div>
    </div>
  </div>
</Layout>


  );
};

export default CallShiftSetting;
