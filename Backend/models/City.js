import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const City = sequelize.define(
  "City",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    state_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE },
  },
  {
    tableName: "cities",
    timestamps: false,
  }
);

export default City;
