import AdminHasRole from "../models/AdminHasRole.js";

export const assignRoleToAdmin = async (req, res) => {
  try {
    const { admin_id, role_id } = req.body;

    await AdminHasRole.create({ admin_id, role_id });

    res.json({
      message: "Role assigned to admin"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
