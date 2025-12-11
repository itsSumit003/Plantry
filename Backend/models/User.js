import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Address from "./Address.js";

const User = sequelize.define("User", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },

  name: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },

  email: { 
    type: DataTypes.STRING(150), 
    allowNull: false, 
    unique: true 
  },

  password: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },

  created_at: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },

  updated_at: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },

  deleted_at: { 
    type: DataTypes.DATE, 
    allowNull: true 
  }

}, {
  tableName: "users",
  timestamps: true
});

User.hasMany(Address, { foreignKey: "user_id" });

export default User;
