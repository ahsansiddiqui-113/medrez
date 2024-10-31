import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import axios from "axios";

function Residents() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    pager: "n/a",
    year: "",
    level: "",
    sequence: "",
    email: "",
    password: "",
  });
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [showDeletedPopup, setShowDeletedPopup] = useState(false);
  const [deletedItems, setDeletedItems] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const response = await axios.get("http://localhost:5000/api/residents");
      setTableData(response.data);
    };
    fetchResidents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLevelSelect = (level) => {
    setFormData({ ...formData, level });
  };

  const generatePassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing !== null) {
      await axios.put(
        `http://localhost:5000/api/residents/${tableData[isEditing]._id}`,
        formData
      );
      const updatedData = [...tableData];
      updatedData[isEditing] = formData;
      setTableData(updatedData);
      setIsEditing(null);
    } else {
      const newResidentData = {
        ...formData,
        password: generatePassword(),
      };
      const response = await axios.post(
        "http://localhost:5000/api/residents",
        newResidentData
      );
      setTableData([...tableData, response.data]);
    }
    setIsOpen(false);
    setFormData({
      name: "",
      pager: "n/a",
      year: "",
      level: "",
      sequence: "",
      email: "",
      password: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(tableData[index]);
    setIsEditing(index);
    setIsOpen(true);
  };

  const getNextLevel = (currentLevel) => {
    const levels = [
      "Intern",
      "PGY-1",
      "PGY-2",
      "PGY-3",
      "PGY-4",
      "PGY-5",
      "PGY-6",
      "PGY-7",
      "Fellow",
      "Attending",
      "Other",
    ];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex !== -1 && currentIndex < levels.length - 1
      ? levels[currentIndex + 1]
      : currentLevel;
  };

  const handleDelete = async (index) => {
    const itemToDelete = tableData[index];
    setDeletedItems([...deletedItems, itemToDelete]);
    await axios.delete(
      `http://localhost:5000/api/residents/${itemToDelete._id}`
    );
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  const handleRestore = async (index) => {
    const itemToRestore = deletedItems[index];
    await axios.put(
      `http://localhost:5000/api/residents/restore/${itemToRestore._id}`
    );
    setTableData([...tableData, itemToRestore]);
    const updatedDeletedItems = deletedItems.filter((_, i) => i !== index);
    setDeletedItems(updatedDeletedItems);
  };

  const handlePermanentDelete = async (index) => {
    const itemToDelete = deletedItems[index];
    await axios.delete(
      `http://localhost:5000/api/residents/permanent/${itemToDelete._id}`
    );
    const updatedDeletedItems = deletedItems.filter((_, i) => i !== index);
    setDeletedItems(updatedDeletedItems);
  };

  const handleDeleteAllPermanently = () => {
    setDeletedItems([]);
    setShowDeletedPopup(false);
  };

  return (
    <Layout>
      <div className="w-[80%]">
        <div className="bg-[#F3F3F3] flex flex-row  h-12 items-center justify-between px-6">
          <p className="font-bold text-2xl">Residents</p>
          <button>
            <i className="ri-notification-2-line px-6"></i>
          </button>
        </div>
        <div className="flex gap-5  justify-center mt-10 relative">
          <button
            className="px-6 py-2 bg-[#11BE79] rounded-lg text-white"
            onClick={() => setIsOpen(true)}
          >
            Add Resident
          </button>
          <button
            className="text-xl bg-[#E5E5E5] px-2 rounded-lg"
            onClick={() => setShowDeletedPopup(true)}
          >
            <i className="ri-delete-bin-6-line"></i>
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="shadow-2xl rounded-md w-[33%] max-h-[80%] p-4 bg-white overflow-y-auto">
              <h1 className="font-bold text-xl">
                {isEditing !== null ? "Edit Resident" : "Create Resident or Staff"}
              </h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter Resident Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="rounded-lg p-2 bg-[#F4F4F4]"
                />

                <p className="mt-2">Level:</p>
                <p className="text-[#8c8c8c]">Fixed</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    "PGY-7", "PGY-6", "PGY-5", "PGY-4", "PGY-3", "PGY-2", "PGY-1", "Intern", "Fellow", "Attending", "Other"
                  ].map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => handleLevelSelect(level)}
                      className={`py-2 px-3 rounded-lg ${formData.level === level
                          ? "bg-[#11BE79] text-white"
                          : "bg-[#f4f4f4]"
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                <p className="mt-4 text-[#8c8c8c]">Sequence</p>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="py-3 px-2 bg-[#f4f4f4] rounded-md font-semibold"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Year</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                  <select
                    className="py-3 px-2 bg-[#f4f4f4] rounded-md font-semibold"
                    name="sequence"
                    value={formData.sequence}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Sequence</option>
                    <option value="PGY-1">PGY-1</option>
                    <option value="PGY-2">PGY-2</option>
                    <option value="PGY-3">PGY-3</option>
                    <option value="PGY-3">PGY-4</option>
                    <option value="PGY-3">PGY-5</option>
                    <option value="PGY-3">PGY-6</option>
                    <option value="PGY-3">PGY-7</option>
                    <option value="PGY-3">Intern</option>
                    <option value="PGY-3">Fellow</option>
                    <option value="PGY-3">Attending</option>
                    <option value="PGY-3">Other</option>
                  </select>
                </div>

                <label className="mt-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email Address"
                  className="rounded-lg p-2 bg-[#F4F4F4]"
                />

                <label className="mt-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  className="rounded-lg p-2 bg-[#F4F4F4]"
                />

                <label className="mt-2">Pager</label>
                <input
                  type="text"
                  name="pager"
                  value={formData.pager}
                  onChange={handleInputChange}
                  placeholder="Pager"
                  className="rounded-lg p-2 bg-[#F4F4F4]"
                />

                <div className="flex justify-between mt-4">
                  <button
                    className="text-red-600 font-semibold"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-[#11BE79] text-white px-6 py-2 rounded-md"
                    type="submit"
                  >
                    {isEditing !== null ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        <div className="flex justify-center mt-5">
          <table className="w-[60%]">
            <thead className="text-center bg-[#e5e5e5]">
              <tr className="border border-black">
                <th className="border border-black">Name</th>
                <th className="border border-black">
                  Level
                  <div className="flex justify-around text-[#7f7f7f]">
                    <div className="font-normal">2024-2025</div>
                    <div className="font-normal">2025-2026</div>
                  </div>
                </th>
                <th className="border border-black">Pager</th>
                <th className="border border-black">Edit</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-black">
                    <span className="">{data.name}</span>
                  </td>
                  <td className="border border-black">
                    <div className="flex justify-around">
                      <div>{data.level}</div>
                      <div>{getNextLevel(data.level)}</div>
                    </div>
                  </td>
                  <td className="border border-black">{data.pager}</td>
                  <td className="flex justify-around items-center border-b-2">
                    <button
                      className="text-gray-500"
                      onClick={() => handleEdit(index)}
                    >
                      <i className="ri-edit-box-line"></i>
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(index)}
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDeletedPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[40%]">
            <h2 className="text-xl font-bold mb-4">Trash Residents</h2>
            <ul>
              {deletedItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-MedrezLightGray p-3 rounded-lg mb-3"
                >
                  <div>
                    <span>{item.name}</span> - <span>{item.level}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="text-white bg-MedrezBlue p-3 rounded-lg w-12 h-12 flex items-center justify-center"
                      onClick={() => handleRestore(index)}
                    >
                      <SettingsBackupRestoreIcon />
                    </button>
                    <button
                      className="text-white bg-red-500 p-3 rounded-lg w-12 h-12 flex items-center justify-center"
                      onClick={() => handlePermanentDelete(index)}
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <button
                className="text-red-500 font-bold"
                onClick={handleDeleteAllPermanently}
              >
                Delete All Permanently
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowDeletedPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Residents;
