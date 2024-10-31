import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { year, name } = useParams();
  const [menu, setMenu] = useState([
    {
      label: "Dashboard",
      href: "/user-dashboard",
      icon: <i className="ri-home-line mr-2"></i>,
    },
    {
      label: "Your Account",
      href: "/user-account",
      icon: <i className="ri-account-circle-line mr-2"></i>,
    },
    {
      label: "Settings",
      href: "/user-settings",
      icon: <i className="ri-settings-2-line mr-2"></i>,
    },
    {
      label: "Help",
      href: "/help",
      icon: <i className="ri-question-line mr-2"></i>,
    },
  ]);
  const [bottomMenu, setBottomMenu] = useState([
   
  ]);

  const handleLogoutSubmit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="bg-[#073AA8] w-[20%] sticky top-0 z-10 h-full flex flex-col justify-between">
          <h1 className="text-[#11BE79] font-bold text-3xl px-6 py-0">
            MedRez<span className="text-white font-normal">.net</span>
          </h1>

          <ul className="text-white">
            {menu.map((items, index) => (
              <li
                key={index}
                className="p-2 px-6 mx-4 rounded-lg m-2"
                style={{
                  background:
                    location.pathname === items.href ? "#11BE79" : "transparent",
                }}
              >
                <Link to={items.href}>
                  {items.icon}
                  {items.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="text-white mb-4">
            {bottomMenu.map((items, index) => (
              <li
                key={index}
                className="p-2 px-6 mx-4 rounded-lg m-2"
                style={{
                  background:
                    location.pathname === items.href ? "#11BE79" : "transparent",
                }}
              >
                <Link to={items.href}>
                  {items.icon}
                  {items.label}
                </Link>
              </li>
            ))}
            <li className="p-2 px-6 mx-4 rounded-lg m-2">
              <button onClick={handleLogoutSubmit} >
                <i className="ri-logout-box-r-line mr-2"></i>Logout
              </button>
            </li>
          </ul>
        </div>

        <div className="flex-grow bg-gray-100 p-6">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
