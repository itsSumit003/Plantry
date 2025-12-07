import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../components/layout/AdminLayout";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductList from "../pages/products/ProductList";
import ProductForm from "../pages/products/ProductForm";
import ProductEdit from "../pages/products/ProductEdit";
import CategoryList from "../pages/categories/CategoryList";
import CategoryForm from "../pages/categories/CategoryForm";
import BannerList from "../pages/banners/BannerList";
import BannerForm from "../pages/banners/BannerForm";
import Profile from "../settings/Profile.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected admin routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        {/* Product Routes */}
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductEdit />} />

        {/* Category Routes */}
        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/new" element={<CategoryForm />} />

        {/* Banner Routes */}
        <Route path="banners" element={<BannerList />} />
        <Route path="banners/new" element={<BannerForm />} />

        {/* Settings */}
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
