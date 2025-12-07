import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context.jsx";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="pt-24 flex justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl border">
        {/* USER DETAILS */}
        <div className="text-center mt-6 mb-4">
          <h2 className="text-2xl font-bold text-green-700">
            {user?.name ? `Welcome, ${user.name} 👋` : "My Account"}
          </h2>

          {user?.email && <p className="text-gray-600 mt-1">{user.email}</p>}
        </div>

        {/* TABS */}
        <div className="flex justify-center border-b">
          <NavLink
            end
            to="/userprofile"
            className={({ isActive }) =>
              `px-6 py-3 text-lg ${
                isActive
                  ? "text-green-700 font-semibold border-b-2 border-green-700"
                  : "text-gray-600"
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/userprofile/addresses"
            className={({ isActive }) =>
              `px-6 py-3 text-lg ${
                isActive
                  ? "text-green-700 font-semibold border-b-2 border-green-700"
                  : "text-gray-600"
              }`
            }
          >
            Addresses
          </NavLink>

          <NavLink
            to="/userprofile/orders"
            className={({ isActive }) =>
              `px-6 py-3 text-lg ${
                isActive
                  ? "text-green-700 font-semibold border-b-2 border-green-700"
                  : "text-gray-600"
              }`
            }
          >
            Orders
          </NavLink>
        </div>

        {/* CONTENT (Nested Components) */}
        <div className="p-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
