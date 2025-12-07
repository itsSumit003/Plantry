import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("user");
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg border rounded-xl p-10 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold text-green-700 mb-4">
          You’ve been logged out
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for visiting. See you soon!
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-green-700 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-800 transition"
        >
          Back to Home
        </button>

      </div>
    </div>
  );
};

export default Logout;
