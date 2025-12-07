import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const { login, loading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  // FIXED stronger regex (your version had a SPACE after +)
  const validate = () => {
    if (!form.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format";

    const password = form.password;

    if (!password) return "Password is required";
    if (password.length < 8)
      return "Password must be at least 8 characters";

    if (!/[A-Z]/.test(password))
      return "Password must include 1 uppercase letter (A-Z)";

    if (!/[a-z]/.test(password))
      return "Password must include 1 lowercase letter (a-z)";

    if (!/[0-9]/.test(password))
      return "Password must include 1 number (0-9)";

    if (!/[!@#$%^&*()_+ -]/.test(password))
      return "Password must include 1 special character";

    return null;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const err = validate();
    if (err) return setError(err);

    try {
      await login(form.email, form.password); 
      // navigation happens inside AuthContext.login()
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-300 text-sm px-3 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div className="relative">
            <Mail size={20} className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg pl-11 pr-3 py-2 text-sm 
              focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock size={20} className="absolute top-3 left-3 text-gray-400" />

            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg pl-11 pr-11 py-2 text-sm 
              focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
              value={form.password}
              onChange={handleChange}
            />

            <span
              className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700 transition"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2 rounded-lg 
            hover:bg-gray-800 transition-all duration-200 active:scale-[0.98]
            disabled:opacity-60 text-sm font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}
