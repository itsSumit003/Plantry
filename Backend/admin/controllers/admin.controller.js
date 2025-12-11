import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Role from "../models/Role.js";
import AdminHasRole from "../models/AdminHasRole.js";

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;

    const exists = await Admin.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const hash = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ name, email, password: hash });

    if (role_id) {
      await AdminHasRole.create({ admin_id: admin.id, role_id });
    }

    res.json({ message: "Admin created", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
