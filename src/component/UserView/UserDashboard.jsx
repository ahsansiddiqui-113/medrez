import React, { useState } from "react";
import UserLayout from "./UserLayout";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserDashbaord = () => {
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState(currentYear);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const notifications = [
    {
      id: 1,
      message: "You have a new message from John",
      isRead: false,
    },
  ];

  const data = [];

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
    if (!showPopup) {
      fetchNotifications();
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getYearRangeText = (start) => {
    return `Jul 1 ${start} - Jun 30 ${start + 1}`;
  };

  const handlePreviousYear = () => setStartYear(startYear - 1);
  const handleNextYear = () => setStartYear(startYear + 1);

  const toggleCalendar = () => setShowCalendar((prev) => !prev);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <UserLayout>
      <div className="w-full">
        <header className="flex justify-between items-center p-6 bg-gray-100 shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-800">Welcome!</span>
            <div className="relative">
              <button
                className="p-2 bg-white rounded-full focus:outline-none"
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
        </header>

        <div
          className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg transform transition-transform ${showPopup ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-6 w-[100%]">
            <div className="flex items-center justify-between w-[100%]">
              <h2 className="text-sm font-semibold text-gray-500">
                Notifications
              </h2>
              <button onClick={togglePopup}>
                <CloseIcon />
              </button>
            </div>

            <ul className="mt-4 space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-4 bg-gray-100 rounded-lg flex justify-between"
                  >
                    <div>
                      <div className="flex">
                        <NotificationsIcon />
                        <p className="text-gray-700">{notification.message}</p>
                      </div>
                      <span
                        className="text-sm text-blue-500 underline cursor-pointer"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </span>
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

        <div className="flex justify-between gap-5 p-6 bg-white">
          <div className="bg-MedrezLightGray rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4">On Now</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-gray-600 font-semibold mb-5">
                  Ended recently:
                </h3>
                {data.length > 0 ? (
                  <div className="space-y-3">
                    {data.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between gap-2 items-center w-full"
                      >
                        <div className="p-3 border border-gray-300 rounded-lg w-full">
                          <h3 className="font-semibold text-lg">
                            {item.specialty}
                          </h3>
                          <div className="flex items-center gap-3">
                            <p className="text-sm text-gray-500">{item.pgy}</p>
                            <p className="text-sm text-black font-semibold">
                              {item.name}
                            </p>
                          </div>
                        </div>
                        <div className="bg-red-100 text-black p-3 rounded-lg text-sm h-full">
                          Ended at {item.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No shifts or calls ended in the last few hours.
                  </p>
                )}
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-gray-600 font-semibold">On Now:</h3>
                <p className="text-gray-500">
                  No published shifts or calls in progress now.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-gray-600 font-semibold">Starting soon:</h3>
                <p className="text-gray-500">
                  No shifts or calls starting in the next few hours.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-MedrezLightGray rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4">Schedules</h2>
            <div className="flex items-center justify-center bg-MedrezBlue text-white p-1 rounded-md">
              <button
                onClick={handlePreviousYear}
                className="py-1 px-3 bg-blue-800 rounded-full hover:bg-blue-700"
              >
                &lt;
              </button>

              <div
                className="mx-4 text-lg font-bold cursor-pointer"
                onClick={toggleCalendar}
              >
                {getYearRangeText(startYear)}

                {startYear === currentYear && (
                  <span className="text-MedrezGreen ml-2 text-[12px]">
                    Current Year
                  </span>
                )}
              </div>

              <button
                onClick={handleNextYear}
                className="py-1 px-3 bg-blue-800 rounded-full hover:bg-blue-700"
              >
                &gt;
              </button>
            </div>

            <p className="text-center text-gray-500 mt-3">
              No shifts or calls are scheduled for today.
            </p>
          </div>

          <div className="bg-MedrezLightGray rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4">Residents</h2>
            <p className="text-gray-500">
              No assigned residents or activities for today.
            </p>
          </div>
        </div>

        {showCalendar && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">
                Select a Date for Year {startYear}
              </h2>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
              />
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => setShowCalendar(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserDashbaord;
