import Permission from "../models/Permission.js";

export const createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    const permission = await Permission.create({ name });
    res.json({ message: "Permission created", permission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json({ permissions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
