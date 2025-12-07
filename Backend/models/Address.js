import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Address = sequelize.define("Address", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  full_name: { type: DataTypes.STRING(100) },
  mobile: { type: DataTypes.STRING(15) },
  address_line1: { type: DataTypes.STRING(255) },
  address_line2: { type: DataTypes.STRING(255) },
  state_id: { type: DataTypes.INTEGER, allowNull: false },
  city_id: { type: DataTypes.INTEGER, allowNull: false },
  pincode: { type: DataTypes.STRING(10) },
  address_type: { type: DataTypes.ENUM("home", "work") },
  is_default: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: "addresses",
  timestamps: false
});

export default Address;
