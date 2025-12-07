import { useState } from "react";
import { useAuth } from "../../context/auth-context.jsx";
import { FaEyeSlash, FaEye, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginHandler } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loginHandler(form);

    if (res.success) {
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-250px)] flex items-center justify-center bg-white mt-5">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[450px] border border-gray-200 mt-17">
        
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit}>

          {/* EMAIL INPUT WITH ICON */}
          <div className="mb-4 relative">
            <MdEmail className="absolute left-3 top-3 text-gray-500 text-xl" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full border h-11 rounded-lg pl-10 pr-4 border-gray-300 focus:border-green-700 outline-none"
            />
          </div>

          {/* PASSWORD INPUT WITH LEFT + RIGHT ICON */}
          <div className="mb-5 relative">
            {/* LEFT LOCK ICON */}
            <FaLock className="absolute left-3 top-3 text-gray-500 text-lg" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full border h-11 rounded-lg pl-10 pr-10 border-gray-300 focus:border-green-700 outline-none"
            />

            {/* RIGHT EYE ICON */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white h-11 rounded-lg text-lg font-medium hover:bg-green-800 transition"
          >
            Log In
          </button>
        </form>

        {/* SIGNUP LINK */}
        <p className="mt-3 text-center text-gray-700 text-sm">
          New to Plantry?{" "}
          <span
            className="text-green-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            SignUp
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
