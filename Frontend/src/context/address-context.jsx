// src/context/auth-context.jsx
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginService, signupService } from "../services/authService.js";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const localStorageToken = JSON.parse(localStorage.getItem("loginDetails"));

  const [token, setToken] = useState(localStorageToken?.token || "");
  const [currentUser, setCurrentUser] = useState(localStorageToken?.user || null);

  // SIGNUP
  const signupHandler = async ({ firstName, lastName, email, password }) => {
    try {
      const response = await signupService(firstName, lastName, email, password);
      const {
        status,
        data: { createdUser, encodedToken },
      } = response;

      if (status === 200 || status === 201) {
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({ user: createdUser, token: encodedToken })
        );
        setToken(encodedToken);
        setCurrentUser(createdUser);

        toast.success(`Hi, ${createdUser.firstName}!`, {
          icon: "👋",
        });

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      toast.error("There was an error signing you up.");
    }
  };

  // LOGIN
  const loginHandler = async ({ email, password }) => {
    try {
      const response = await loginService(email, password);
      const {
        status,
        data: { foundUser, encodedToken },
      } = response;

      if (status === 200 || status === 201) {
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({ user: foundUser, token: encodedToken })
        );
        setToken(encodedToken);
        setCurrentUser(foundUser);

        toast.success(`Welcome back, ${foundUser.firstName}!`, {
          icon: "👋",
        });

        // redirect back to last page OR home
        navigate(location?.state?.from?.pathname || "/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      toast.error("User does not exist! Please sign up.");
    }
  };

  // LOGOUT
  const logoutHandler = () => {
    localStorage.removeItem("loginDetails");
    setToken(null);
    setCurrentUser(null);
    toast.success("Logged out successfully!");
    navigate("/logout");
  };

  return (
    <AuthContext.Provider
      value={{
        signupHandler,
        loginHandler,
        logoutHandler,
        token,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
