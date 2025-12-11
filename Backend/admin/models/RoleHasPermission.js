import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const RoleHasPermission = sequelize.define(
  "RoleHasPermission",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    permission_id: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    tableName: "role_has_permissions",
    timestamps: false,
    
  }
);

export default RoleHasPermission;
