import React, { useState } from "react";

const FormComponent = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control form visibility
  const [selectedRoles, setSelectedRoles] = useState([]);

  const roles = [
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
  ];

  const toggleRoleSelection = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md w-full max-w-md mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 text-white p-2 rounded-md shadow hover:bg-green-600"
      >
        {isOpen ? "Close Form" : "Open Form"}
      </button>

      {isOpen && (
        <div className="mt-4">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="nameOfSet"
            >
              Name of Set:
            </label>
            <input
              id="nameOfSet"
              type="text"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Name of Set"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="countAs"
            >
              Count as:
            </label>
            <select
              id="countAs"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>One Full Block</option>
              <option>Half Block</option>
              <option>Quarter Block</option>
            </select>
          </div>

          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Applies to:
            </span>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRoleSelection(role)}
                  className={`p-2 rounded-md border ${
                    selectedRoles.includes(role)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <div className="mt-2">
              <a href="#" className="text-blue-600 hover:underline text-sm">
                Apply to All
              </a>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="blockLayout"
            >
              Block Layout:
            </label>
            <select
              id="blockLayout"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>One Full Block</option>
              <option>Two Half Blocks</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-green-500 text-white p-2 rounded-md shadow hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
