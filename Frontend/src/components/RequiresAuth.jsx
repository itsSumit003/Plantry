import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context.jsx";

const RequiresAuth = ({ children }) => {
  const { token } = useAuth(); 
  const location = useLocation();

  // If token exists → allow page
  if (token) {
    return children;
  }

  // If no login → redirect to Login page
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequiresAuth;
