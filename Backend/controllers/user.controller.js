import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check email exists
    const exist = await User.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return res.status(201).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// LOGIN USER

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    return res.json({
      data: user,
      success: true,
      message: "User fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
