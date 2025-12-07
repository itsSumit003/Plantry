import { useState } from "react";
import { useAuth } from "../../context/auth-context.jsx";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye, FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SignUp = () => {
  const { signupHandler } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signupHandler(form);

    if (res.success) {
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-230px)] flex items-center justify-center bg-white pt-[100px]">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[500px] border border-gray-200 mb-5">
        
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          
          {/* NAME */}
          <div className="mb-4 relative">
            <FaUser className="absolute left-3 top-3 text-gray-500 text-lg" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border h-11 rounded-lg pl-10 pr-4 border-gray-300 focus:border-green-700 outline-none"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-4 relative">
            <MdEmail className="absolute left-3 top-3 text-gray-500 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border h-11 rounded-lg pl-10 pr-4 border-gray-300 focus:border-green-700 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-5 relative">
            <FaLock className="absolute left-3 top-3 text-gray-500 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border h-11 rounded-lg pl-10 pr-10 border-gray-300 focus:border-green-700 outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* CREATE BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white h-11 rounded-lg text-lg font-medium hover:bg-green-800 transition"
          >
            Create Account
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="mt-3 text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <span
            className="text-green-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
