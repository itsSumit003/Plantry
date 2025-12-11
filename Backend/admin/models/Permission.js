import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Permission = sequelize.define(
  "Permission",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true }
  },
  {
    tableName: "permissions",
    timestamps: false
  }
);

export default Permission;
