import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [user, setUser] = useState(null);

  // ---------------------------------------------------------
  // RESTORE TOKEN + USER ON REFRESH
  // ---------------------------------------------------------
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }

    if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ---------------------------------------------------------
  // LOGIN HANDLER
  // ---------------------------------------------------------
  const loginHandler = async (form) => {
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", form);

      // SAVE TOKEN & USER
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setToken(res.data.token);
      setUser(res.data.user);

      // MOST IMPORTANT: SET AXIOS HEADER
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      toast.success("Login Successful!");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Credentials!");
      return { success: false };
    }
  };

  // ---------------------------------------------------------
  // SIGNUP HANDLER
  // ---------------------------------------------------------
  const signupHandler = async (form) => {
    try {
      await axios.post("http://localhost:3000/api/users/register", form);

      toast.success("Account Created Successfully! Please Login.");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup Failed!");
      return { success: false };
    }
  };

  // ---------------------------------------------------------
  // LOGOUT HANDLER
  // ---------------------------------------------------------
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setToken("");
    setUser(null);

    // REMOVE AXIOS HEADER
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loginHandler,
        signupHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// EXPORT HOHIYE
export const useAuth = () => useContext(AuthContext);
