import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import PopupModal from "./PopupModal";
import ScheduleIcon from "../assets/ScheduleIcon.png";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Dashboard() {
  const navigate = useNavigate();
  const [hasNotifications, setHasNotifications] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [newScheduleName, setNewScheduleName] = useState(""); 
  const [annualRotationData, setAnnualRotationData] = useState([]);
  const [shiftScheduleData, setShiftScheduleData] = useState([]);

  const saveAnnualRotation = async (newScheduleName) => {
    if (!newScheduleName) {
      alert("Please enter a schedule name."); 
      return;
    }
  
    const newSchedule = {
      name: newScheduleName,
      color: "#FF0707", 
      staffingRequirements: [], 
      vacations: "Allowed", 
      blockSets: "Allowed", 
      tallies: [], 
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/rotations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSchedule),
      });
  
      if (response.ok) {
        fetchAnnualRotationData(); 
      } else {
        console.error('Failed to save annual rotation schedule');
      }
    } catch (error) {
      console.error('Error saving annual rotation schedule:', error);
    }
  };
  
  const fetchAnnualRotationData = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/schedules'); 
        
        if (!response.ok) {
            const text = await response.text(); 
            console.error('Error fetching annual rotation data:', response.status, text);
            return; 
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json(); 
            setAnnualRotationData(data); 
        } else {
            console.error('Expected JSON but received:', contentType);
        }
    } catch (error) {
        console.error('Error fetching annual rotation data:', error);
    }
  };

  const fetchShiftScheduleData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/shift-schedules'); 
      const data = await response.json();
      setShiftScheduleData(data);
    } catch (error) {
      console.error('Error fetching shift schedule data:', error);
    }
  };

  useEffect(() => {
    fetchAnnualRotationData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const notifications = [
    {
      id: 1,
      message: "You have a new message from John",
      isRead: false,
    },
  ];

  const handleEditSchedule = (scheduleName) => {
    const encodedName = encodeURIComponent(scheduleName); 
    navigate(`/annual-rotate/${getYearRangeText(startYear)}/${encodedName}`);
  };

  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState(currentYear);

  const getYearRangeText = (start) => {
    return `Jul 1 ${start} - Jun 30 ${start + 1}`;
  };

  const handlePreviousYear = () => setStartYear(startYear - 1);
  const handleNextYear = () => setStartYear(startYear + 1);

  const handleDeleteSchedule = async (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/rotations/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setAnnualRotationData((prevSchedules) =>
            prevSchedules.filter((schedule) => schedule._id !== id)
          );
        } else {
          const errorText = await response.text();
          console.error('Failed to delete schedule:', response.status, errorText);
        }
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <Layout>
      <div className="w-full flex flex-col bg-gray-100 min-h-screen">
        <div className="flex w-full bg-white shadow-md p-5 gap-5 items-center justify-between rounded-lg">
          <div className="flex gap-5 items-center">
            <h1 className="font-semibold text-2xl text-gray-800">Dashboard</h1>
            <div className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-md">
              <button
                onClick={handlePreviousYear}
                className="py-1 px-3 bg-blue-800 rounded-full hover:bg-blue-700 transition duration-200"
              >
                &lt;
              </button>
              <div className="mx-4 text-lg font-bold">
                {getYearRangeText(startYear)}
                {startYear === currentYear && (
                  <span className="text-green-500 ml-2 text-sm">Current Year</span>
                )}
              </div>
              <button
                onClick={handleNextYear}
                className="py-1 px-3 bg-blue-800 rounded-full hover:bg-blue-700 transition duration-200"
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-800 text-lg">Welcome {user ? user.username : ''}</span>
            <div className="relative">
              <button
                className="p-2 bg-white rounded-full shadow focus:outline-none"
                onClick={togglePopup}
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 8.83v5.328c0 .511-.195.993-.543 1.351L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </button>
              {hasNotifications && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </div>
          </div>
        </div>

        <div className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg transform transition-transform ${showPopup ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 w-full">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-sm font-semibold text-gray-500">Notifications</h2>
              <button onClick={togglePopup}>
                <CloseIcon />
              </button>
            </div>
            <ul className="mt-4 space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li key={notification.id} className="p-4 bg-gray-100 rounded-lg flex justify-between shadow">
                    <div>
                      <div className="flex">
                        <NotificationsIcon />
                        <p className="text-gray-700">{notification.message}</p>
                      </div>
                      <span className="text-sm text-blue-500 underline">Mark as Read</span>
                    </div>
                    <button>
                      <CloseIcon />
                    </button>
                  </li>
                ))
              ) : (
                <p>No new notifications.</p>
              )}
            </ul>
          </div>
        </div>

        <div className="flex">
          <div className="w-[70%] p-5">
            <div className="p-5 flex flex-col gap-5 bg-white rounded-lg shadow-md">
              <h2 className="font-semibold text-xl text-gray-800">Annual Rotations Schedules</h2>
              <div className="bg-gray-50 p-10 rounded-lg shadow-md">
                <div className="flex space-x-2 ml-auto">
                  <button
                    className="text-white font-semibold bg-blue-600 py-2 rounded-lg px-6 hover:bg-blue-700 transition duration-200 flex gap-1 items-center"
                    onClick={handleEditSchedule}
                  >
                    Edit
                    <DriveFileRenameOutlineOutlinedIcon />
                  </button>
                  <button
                    className="bg-red-600 text-white font-semibold py-2 rounded-lg px-6 hover:bg-red-700 transition duration-200"
                    onClick={handleDeleteSchedule}
                  >
                    Delete
                  </button>
                </div>
                {annualRotationData.length > 0 ? (
                  <ul className="space-y-4">
                    {annualRotationData.map((schedule) => (
                      <li key={schedule._id} className="p-4 bg-white rounded-lg shadow flex justify-between">
                        <span>{schedule.scheduleName}</span>
                        <button
                          className="bg-red-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-700 transition duration-200"
                          onClick={() => handleDeleteSchedule(schedule._id)} // Pass the schedule's _id to the delete function
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Annual Rotation Schedules available.</p>
                )}
                <div className="flex flex-col items-center justify-center mt-10 gap-3">
                  <p className="text-gray-600">Want to create more schedules?</p>
                  <PopupModal FormName="Annual Rotations Schedule" onSave={saveAnnualRotation} />
                </div>
              </div>
              <div className="p-5 flex flex-col gap-5">
                <h2 className="font-semibold text-xl text-gray-800">Call & Shift Schedule</h2>
                <div className="bg-gray-50 p-10 rounded-lg shadow-md">
                  <div className="flex space-x-2">
                    <button
                      className="text-white font-semibold bg-blue-600 py-2 rounded-lg px-6 hover:bg-blue-700 flex gap-1 items-center"
                      onClick={() => handleEditSchedule()}
                    >
                      Edit
                      <DriveFileRenameOutlineOutlinedIcon />
                    </button>
                    <button
                      className="bg-red-600 text-white font-semibold py-2 rounded-lg px-6"
                      onClick={() => handleDeleteSchedule()}
                    >
                      Delete
                    </button>
                  </div>
                  {shiftScheduleData.length > 0 ? (
                    <div>
                      <ul className="space-y-6">
                        {shiftScheduleData.map((schedule, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg"
                          >
                            <span className="text-lg font-medium text-gray-800 flex gap-4 items-center">
                              <img src={ScheduleIcon} alt="" className="w-8 h-8 rounded-full" />
                              {schedule.scheduleName}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col items-center justify-center mt-10 gap-3">
                        <p className="text-gray-600">Want to create more schedules?</p>
                        <PopupModal FormName="Annual Rotations Schedule" onSave={saveAnnualRotation} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3">
                      <p className="text-gray-600">No Call and Shift Schedules till now!</p>
                      <PopupModal
                        FormName="Call and Shift Schedule"
                        selectedYear={getYearRangeText(startYear)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[30%] p-4">
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-bold mb-2">Notifications</h2>
                <div className="p-2 bg-green-100 rounded-lg mb-2 flex items-center">
                  <span className="text-green-700 font-bold">⚠️</span>
                  <span className="ml-2">1 new or changed requests!</span>
                </div>
                <div className="p-2 bg-red-100 rounded-lg flex items-center">
                  <span className="text-red-700 font-bold">⚠️</span>
                  <span className="ml-2">Alert Red</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-bold mb-2">Sticky Notes</h2>
                <textarea
                  className="w-full h-24 p-2 border border-gray-300 rounded-lg"
                  placeholder="Write Something Important"
                />
              </div>

              <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-bold mb-2">Announcements</h2>
                <div className="flex bg-gray-50 p-3 rounded-lg items-center mb-2">
                  <span className="text-green-600 font-bold">Aug 30</span>
                  <span className="ml-2">- Summer 2024 fixes and improvements</span>
                </div>
                <div className="flex bg-gray-50 p-3 rounded-lg items-center mb-2">
                  <span className="text-green-600 font-bold">May 2</span>
                  <span className="ml-2">- New: Days Off Per Week rule now has a "do not average over block" option!</span>
                </div>
                <a href="#!" className="text-blue-600 underline">More on the Forums</a>
              </div>

              <div className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
                <span className="text-xl font-bold">Trashed Schedules</span>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Open Trash</button>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg shadow flex justify-between items-center">
                <div>
                  <span className="text-xl font-bold">Customer Support</span>
                  <ul className="list-disc p-5">
                    <li>Browse the Schedule Maker's Guide</li>
                    <li>Visit the Support Forums</li>
                    <li>Email: support@medrez.net</li>
                  </ul>
                  <p>Support is available during regular West Coast business hours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
