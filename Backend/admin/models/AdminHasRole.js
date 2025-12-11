import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const AdminHasRole = sequelize.define(
  "AdminHasRole",
  { 
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    admin_id: { type: DataTypes.INTEGER, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    tableName: "admin_has_roles",
    timestamps: false,
    
  }
);

export default AdminHasRole;
