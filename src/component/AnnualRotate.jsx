import { useState, useEffect } from "react";
import Layout from "./Layout";
import { useSchedule } from "./context/ScheduleContext";
import SchedulePickingTable from "./AnnualRotationsComponents/SchedulePickingTable";
import BlocksTab from "./AnnualRotationsComponents/BlocksTab";
import { useParams, useNavigate } from "react-router-dom";
import RotationsTab from "./AnnualRotationsComponents/RotationsTab";
import SettingsTab from "./AnnualRotationsComponents/SettingsTab";
import axios from "axios";  

function AnnualRotate() {
  const { annualRotationData } = useSchedule();
  const { year: paramYear, name: paramName } = useParams();
  const [selectedTab, setSelectedTab] = useState("Schedule");
  const [editableName, setEditableName] = useState(paramName || "Default Name");
  const [editableYear, setEditableYear] = useState(paramYear || "2024");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (paramName && paramYear) {
      setEditableName(paramName);
      setEditableYear(paramYear);
    }
  }, [paramName, paramYear]);

  const handleSave = async () => {
    if (!editableName || !editableYear) {
      alert("Name and Year cannot be empty");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/rotations/${editableYear}/${editableName}`, {
        name: editableName,
        year: editableYear,
      });

      navigate(`http://localhost:5000/api/rotations/${editableYear}/${editableName}`);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditableName(paramName || "Default Name");
    setEditableYear(paramYear || "2024");
    setIsEditing(false);
  };

  return ( 
    <Layout>
      <div className="w-[80%] flex flex-col gap-7">
        <div className="header bg-MedrezLightGray p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold">Annual Rotation Schedules</h1>
        </div>

        <div className="content flex flex-col gap-8 mt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <input
                    className="input border rounded px-3 py-2"
                    value={editableName}
                    onChange={(e) => setEditableName(e.target.value)}
                  />
                  <input
                    className="input border rounded px-3 py-2"
                    value={editableYear}
                    onChange={(e) => setEditableYear(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">{editableName}</h2>
                  <p className="text-MedrezGreen font-semibold text-xl">
                    {editableYear}
                  </p>
                </>
              )}
            </div>
            <div className="actions flex gap-4">
              {isEditing ? (
                <>
                  <button
                    className="btn bg-MedrezBlue text-white px-6 py-2 rounded-lg font-semibold shadow-sm"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn bg-ButtonGrey text-black px-6 py-2 rounded-lg font-semibold shadow-sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn bg-MedrezBlue text-white px-6 py-2 rounded-lg font-semibold shadow-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
              {["Blocks", "Rotations", "Schedule", "Settings"].map((tab) => (
                <button
                  key={tab}
                  className={`btn ${
                    selectedTab === tab
                      ? "bg-MedrezBlue text-white"
                      : "bg-ButtonGrey text-black"
                  } px-6 py-2 rounded-lg font-semibold shadow-sm`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="tab-content py-6">
            {selectedTab === "Blocks" && <BlocksTab />}
            {selectedTab === "Schedule" && <SchedulePickingTable />}
            {selectedTab === "Rotations" && <RotationsTab />}
            {selectedTab === "Settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AnnualRotate;
