import express from "express";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import stateRoutes from "./routes/state.routes.js";
import cityRoutes from "./routes/city.routes.js";
import addressRoutes from "./routes/address.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import bannerRoutes from "./routes/banner.routes.js";
import CartRoutes from "./routes/cart.routes.js";
import Watchlist from "./routes/watchlist.routes.js";
import cors from "cors";
import adminRoutes from "../Backend/admin/routes/admin.routes.js";
import roleRoutes from "../Backend/admin/routes/role.routes.js";
import permissionRoutes from "../Backend/admin/routes/permission.routes.js";
import assignRoutes from "../Backend/admin/routes/assign.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FIXED CORS (Support both Frontends: 5173 & 5174)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// ROUTES
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/watchlist", Watchlist);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin/auth", adminRoutes);
app.use("/api/admin/roles", roleRoutes);
app.use("/api/admin/permissions", permissionRoutes);
app.use("/api/admin/assign", assignRoutes);

export default app;
