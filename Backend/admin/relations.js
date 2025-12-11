import Admin from "./models/Admin.js";
import Role from "./models/Role.js";
import Permission from "./models/Permission.js";
import AdminHasRole from "./models/AdminHasRole.js";
import RoleHasPermission from "./models/RoleHasPermission.js";

Admin.belongsToMany(Role, {
  through: AdminHasRole,
  foreignKey: "admin_id"
});

Role.belongsToMany(Admin, {
  through: AdminHasRole,
  foreignKey: "role_id"
});

Role.belongsToMany(Permission, {
  through: RoleHasPermission,
  foreignKey: "role_id"
});

Permission.belongsToMany(Role, {
  through: RoleHasPermission,
  foreignKey: "permission_id"
});
