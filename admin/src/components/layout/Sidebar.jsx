import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded text-sm ${
      isActive ? "bg-gray-800 text-white" : "text-gray-200"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 space-y-2">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <NavLink className={linkClass} to="/dashboard">Dashboard</NavLink>
      <NavLink className={linkClass} to="/products">Products</NavLink>
      <NavLink className={linkClass} to="/products/new">Add Product</NavLink>
      <NavLink className={linkClass} to="/categories">Categories</NavLink>
      <NavLink className={linkClass} to="/categories/new">Add Category</NavLink>
      <NavLink className={linkClass} to="/banners">Banners</NavLink>
      <NavLink className={linkClass} to="/banners/new">Add Banner</NavLink>
      <NavLink className={linkClass} to="/profile">Profile</NavLink>
    </aside>
  );
}
