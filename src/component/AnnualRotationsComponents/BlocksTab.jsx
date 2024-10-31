import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const BlocksTab = () => {
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
    <div>
      <div>
        <div className="mx-10 p-6 rounded-md min-w-[100">
          <div className="flex gap-5">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-green-500 text-white p-2 rounded-md shadow hover:bg-green-600"
            >
              {isOpen ? "Close Form" : "Open Form"}
            </button>
            <button className="bg-ButtonGrey text-black px-4 py-2 rounded-lg">
              Show Trash <DeleteOutlineIcon />
            </button>
          </div>

          {isOpen && (
            <div className="mt-4">
              <div className="flex gap-5">
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
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm bg-MedrezLightGray"
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
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm bg-MedrezLightGray"
                  >
                    <option>One Full Block</option>
                    <option>Half Block</option>
                    <option>Quarter Block</option>
                  </select>
                </div>
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

              <div className="flex">
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="blockLayout"
                  >
                    Block Layout:
                  </label>
                  <select
                    id="blockLayout"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm bg-MedrezLightGray"
                  >
                    <option>One Full Block</option>
                    <option>Two Half Blocks</option>
                  </select>
                </div>
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
          <div className="flex w-full mt-7">
            <table className="min-w-[30%] border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-200">
                    Rotations
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="border border-gray-300 px-4 py-2 bg-white text-center h-[300px]"
                    colSpan="2"
                  >
                    Pick Rotation Above!
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
            <div className="w-full overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border w-[100px] border-gray-300 px-4 py-2 min-w-[200px] bg-gray-200">
                      July 2024
                    </th>
                    <th className="border border-gray-300 w-[100px] px-4 py-2 min-w-[200px] bg-gray-200">
                      August 2024
                    </th>
                    <th className="border border-gray-300 w-[100px] px-4 py-2 min-w-[200px] bg-gray-200">
                      September 2024
                    </th>
                    <th className="border border-gray-300 w-[100px] px-4 py-2 min-w-[200px] bg-gray-200">
                      October 2024
                    </th>
                    <th className="border border-gray-300 w-[100px] px-4 py-2 min-w-[200px] bg-gray-200">
                      November 2024
                    </th>
                    <th className="border border-gray-300 w-[100px] px-4 py-2 min-w-[200px] bg-gray-200">
                      December 2024
                    </th>
                    <th className="border border-gray-300 w-[100px] px-4 py-2 min-w-[200px] bg-gray-200">
                      January 2025
                    </th>
                    <th className="border border-gray-300 w-[100px] px-4 py-2 min-w-[200px] bg-gray-200">
                      February 2025
                    </th>
                    <th className="border border-gray-300 w-[100px] px-4 py-2 min-w-[200px] bg-gray-200">
                      March 2025
                    </th>
                    <th className="border border-gray-300 w-[100px] px-4 py-2 min-w-[200px] bg-gray-200">
                      April 2025
                    </th>
                    <th className="border border-gray-300 w-[100px] px-4 py-2 min-w-[200px] bg-gray-200">
                      June 2024
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" px-4 py-2 bg-white text-center h-14"></td>
                    <td className=" px-4 py-2 bg-white text-center"></td>
                    <td className=" px-4 py-2 bg-white text-center"></td>
                    <td className=" px-4 py-2 bg-white text-center"></td>
                    <td className=" px-4 py-2 bg-white text-center"></td>
                    <td className=" px-4 py-2 bg-white text-center"></td>
                    <td className=" px-4 py-2 bg-white text-center"></td>
                    <td className=" px-4 py-2 bg-white text-center"></td>
                    <td className=" px-4 py-2 bg-white text-center"></td>
                    <td className=" px-4 py-2 bg-white text-center"></td>
                    <td className=" px-4 py-2 bg-white text-center"></td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocksTab;
