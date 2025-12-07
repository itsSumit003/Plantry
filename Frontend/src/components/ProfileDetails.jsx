import React from "react";
import { useAuth } from "../context/auth-context.jsx";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <p className="text-xl font-semibold text-green-900">
        Name: <span className="text-black">{user?.name}</span>
      </p>

      <p className="text-xl font-semibold mt-3 text-green-900">
        Email: <span className="text-black">{user?.email}</span>
      </p>

      <button
        onClick={() => navigate("/logout")}
        className="mt-6 px-6 py-2 border border-red-400 text-red-600 rounded-md hover:bg-red-50 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDetails;
