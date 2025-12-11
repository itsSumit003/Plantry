import dotenv from "dotenv";
import sequelize from "./config/db.js";
import db from "./models/index.js";
import "./admin/relations.js";
import app from "./app.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully!");

    await db.sequelize.sync({ alter: false }); 
    console.log("Database synced!");

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

startServer();
