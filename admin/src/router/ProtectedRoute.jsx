import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (!user || user.role !== "admin")
    return <div className="p-10 text-red-600 font-medium">Not authorized.</div>;

  return children;
}
