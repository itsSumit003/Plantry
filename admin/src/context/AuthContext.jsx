import { createContext, useContext, useState } from "react";
import axiosClient from "../api/axiosClient";
import { ENDPOINTS } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const res = await axiosClient.post(ENDPOINTS.LOGIN, { email, password });

      if (!res.data.success) {
        throw new Error(res.data.message || "Invalid credentials");
      }

      if (res.data.user.role !== "admin") {
        throw new Error("Only admin can login");
      }

      setUser(res.data.user);
      setToken(res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard"); 
    // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
