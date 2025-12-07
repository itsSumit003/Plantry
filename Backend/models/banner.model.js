import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Banner = sequelize.define(
  "Banner",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    image: { type: DataTypes.TEXT }, 
    redirect_url: { type: DataTypes.STRING },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "banners",
    timestamps: false,
  }
);

export default Banner;
