import Admin from "../models/Admin.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

export const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const admin = await Admin.findByPk(req.admin.id, {
        include: {
          model: Role,
          include: Permission
        }
      });

      const allPermissions = admin.Roles.flatMap(r =>
        r.Permissions.map(p => p.name)
      );

      if (!allPermissions.includes(requiredPermission)) {
        return res.status(403).json({ message: "Permission denied" });
      }

      next();

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
