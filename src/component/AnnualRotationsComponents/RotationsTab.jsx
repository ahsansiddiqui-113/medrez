import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RotationForm from "./RotationForm";
import axios from "axios";

const RotationsTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [rotationList, setRotationList] = useState([]);
  const [suggestedRotations, setSuggestedRotations] = useState([]);
  const [selectedRotation, setSelectedRotation] = useState(null);
  const [deletedRotations, setDeletedRotations] = useState([]);
  const [showDeletedPopup, setShowDeletedPopup] = useState(false);

  const handleAddRotationClick = () => {
    setSelectedRotation(null);
    setShowForm(true);
  };

  useEffect(() => {
    const fetchRotations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rotations");
        setRotationList(response.data);
      } catch (error) {
        console.error("Error fetching rotations:", error);
      }
    };
    fetchRotations();
  }, []);

  const handleDeleteRotation = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/rotations/${id}`
      );

      if (response.status === 200) {
        setRotationList(rotationList.filter((rotation) => rotation._id !== id));
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting rotation:", error);
    }
  };

  const handleSaveClick = (updatedRotation) => {
    if (selectedRotation) {
      const updatedList = rotationList.map((rotation) =>
        rotation._id === selectedRotation._id ? updatedRotation : rotation
      );
      setRotationList(updatedList);
    } else {
      setRotationList([...rotationList, updatedRotation]);
    }
    setShowForm(false);
  };

  const handleEditRotation = (index) => {
    const rotation = rotationList[index];
    setSelectedRotation(rotation);
    setShowForm(true);
  };

  const handleCheckRotation = async (index) => {
    const rotation = suggestedRotations[index];

    try {
      const response = await axios.post("http://localhost:5000/api/rotations", {
        name: rotation.name,
        color: rotation.color,
        staffingRequirements: rotation.staffingRequirements,
        vacations: rotation.vacations,
        blockSets: rotation.blockSets,
        tallies: rotation.tallies,
      });

      setRotationList([...rotationList, response.data]);
      console.log(`Rotation ${rotation.name} added successfully!`);
    } catch (error) {
      console.error("Error adding rotation:", error);
    }
  };

  const handleDeleteOldRotation = async (index) => {
    const deletedRotation = rotationList[index];

    try {
      await axios.delete(`http://localhost:5000/api/rotations/${deletedRotation._id}`);

      setDeletedRotations([...deletedRotations, deletedRotation]);
      setRotationList(rotationList.filter((_, i) => i !== index));
      console.log(`Rotation ${deletedRotation.name} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting rotation:", error);
    }
  };

  const handleRestoreRotation = (index) => {
    const restoredRotation = deletedRotations[index];
    setRotationList([...rotationList, restoredRotation]);
    setDeletedRotations(deletedRotations.filter((_, i) => i !== index));
  };

  const handleToggleDeletedPopup = () => {
    setShowDeletedPopup(!showDeletedPopup);
  };

  const handleDeleteAll = () => {
    setDeletedRotations([]);
  };

  const handlePermanentDelete = (index) => {
    setDeletedRotations(deletedRotations.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="header flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Rotations Management</h1>
        <div className="flex gap-3">
          <button
            className="btn bg-MedrezGreen text-white p-2 rounded-md shadow hover:bg-green-600"
            onClick={handleAddRotationClick}
          >
            Add Rotation
          </button>
          <button
            className="btn bg-ButtonGrey text-black p-2 rounded-md shadow hover:bg-gray-600"
            onClick={handleToggleDeletedPopup}
          >
            <DeleteOutlineIcon />
          </button>
        </div>
      </div>

      {showDeletedPopup && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">
              Trash ({deletedRotations.length} Rotations in Trash)
            </h2>
            <div className="space-y-4">
              {deletedRotations.map((rotation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-2 h-14"
                      style={{ backgroundColor: rotation.color }}
                    ></div>
                    <span>{rotation.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                      onClick={() => handleRestoreRotation(index)}
                    >
                      Restore
                    </button>
                    <button
                      className="btn bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handlePermanentDelete(index)}
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setShowDeletedPopup(false)}
              >
                Close
              </button>
              <button
                className="btn bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700"
                onClick={handleDeleteAll}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full mt-6">
        <div className="rotation-list w-1/3 border-r-2 pr-4">
          <h2 className="text-lg font-semibold mb-2">Current Rotations</h2>
          {rotationList.length > 0 ? (
            rotationList.map((rotation, index) => (
              <div
                key={rotation._id || index}
                className="flex items-center gap-4 mb-2 bg-gray-200 rounded-lg p-2"
              >
                <div
                  className="w-2 h-14"
                  style={{ backgroundColor: rotation.color }}
                ></div>
                <span>{rotation.name}</span>
                <div className="ml-auto flex gap-2">
                  <button onClick={() => handleEditRotation(index)}>
                    <BorderColorIcon />
                  </button>
                  <button
                    className="btn bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    onClick={() => handleDeleteOldRotation(index)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No rotations available.</div>
          )}
        </div>

        <div className="suggested-rotations w-2/3 pl-4">
          <h2 className="text-lg font-semibold mb-2">Suggested Rotations</h2>
          {suggestedRotations.map((rotation, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mb-2 bg-gray-100 rounded-lg p-2"
            >
              <div
                className="w-2 h-14"
                style={{ backgroundColor: rotation.color }}
              ></div>
              <span>{rotation.name}</span>
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => handleCheckRotation(index)}
                  className="btn bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  <CheckIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <RotationForm
          selectedRotation={selectedRotation}
          onSaveClick={handleSaveClick}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default RotationsTab;
