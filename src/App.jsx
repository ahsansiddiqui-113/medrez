import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CallAndShift from "./component/CallAndShift";
import Residents from "./component/Residents";
import Dashboard from "./component/Dashboard";
import CallShiftBLock from "./component/CallShiftBLock";
import "remixicon/fonts/remixicon.css";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import PrivateRoute from "./PrivateRoute";
import Account from "./component/Account";
import SettingsPage from "./component/Setting";
import Layout from "./component/UserView/UserLayout";
import UserDashbaord from "./component/UserView/UserDashboard";
import UserAccount from "./component/UserView/UserAccount";
import UserSettingsPage from "./component/UserView/UserSetting";
import Terms from "./component/term";
import CallShiftSetting from "./component/CallandShift/settingcallshift";
import { useEffect, useState } from "react";
import AnnualRotate from "./component/AnnualRotate";
import AnnualRotation from "./component/AnnualRotation";

function App() {
  const [hasData, setHasData] = useState(false);
  const BASE_URL = "http://localhost:5000/api"; // Fixed the URL format

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rotationsResponse, schedulesResponse, residentsResponse] = await Promise.all([
          fetch(`${BASE_URL}/rotations`),
          fetch(`${BASE_URL}/schedules`),
          fetch(`${BASE_URL}/residents`)
        ]);

        const rotationsData = await rotationsResponse.json();
        const schedulesData = await schedulesResponse.json();
        const residentsData = await residentsResponse.json();

        setHasData(rotationsData.length > 0 || schedulesData.length > 0 || residentsData.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasData(false);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/residents" element={<PrivateRoute element={<Residents />} />} />
        <Route path="/settingcall" element={<PrivateRoute element={<CallShiftSetting />} />} />
        <Route
          path="/Annual-rotate/:year/:name"
          element={<PrivateRoute element={hasData ? <AnnualRotate /> : <AnnualRotation />} />}
        />
        <Route path="/call-and-shift" element={<PrivateRoute element={<CallAndShift />} />} />
        <Route path="/call-&-shift-Block" element={<PrivateRoute element={<CallShiftBLock />} />} />
        <Route path="/your-account" element={<PrivateRoute element={<Account />} />} />
        <Route path="/user-account" element={<PrivateRoute element={<UserAccount />} />} />
        <Route path="/settings" element={<PrivateRoute element={<SettingsPage />} />} />
        <Route path="/user-settings" element={<PrivateRoute element={<UserSettingsPage />} />} />
        <Route path="/user-dashboard" element={<PrivateRoute element={<UserDashbaord />} />} />
        <Route path="/userlayout" element={<PrivateRoute element={<Layout />} />} />
        <Route path="/terms" element={<PrivateRoute element={<Terms />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
