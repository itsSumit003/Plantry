import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [password, setPassword] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    alert("Implement password update API in backend!");
  };

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-bold">Profile</h2>

      <div className="bg-white rounded-xl shadow p-4 space-y-3">
        <h3 className="text-lg font-semibold">Account Details</h3>

        <div className="text-sm">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </div>

      <form
        onSubmit={handlePasswordChange}
        className="bg-white rounded-xl shadow p-4 space-y-4"
      >
        <h3 className="text-lg font-semibold">Update Password</h3>

        <div>
          <label className="block text-sm mb-1">New Password</label>
          <input
            type="password"
            required
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="px-4 py-2 bg-gray-900 text-white rounded">
          Update Password
        </button>
      </form>
    </div>
  );
}
