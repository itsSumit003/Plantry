import RoleHasPermission from "../models/RoleHasPermission.js";

export const assignPermissionToRole = async (req, res) => {
  try {
    const { role_id, permission_id } = req.body;

    await RoleHasPermission.create({ role_id, permission_id });

    res.json({
      message: "Permission assigned to role",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
