import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h2 className="font-bold">Admin Dashboard</h2>

      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.email}</span>
        <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
