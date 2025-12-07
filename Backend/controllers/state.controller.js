import State from "../models/State.js";

export const getAllStates = async (req, res) => {
  try {
    const states = await State.findAll({ where: { status: true } });
    res.json({ success: true, message: "States fetched", data: states });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createState = async (req, res) => {
  try {
    const { name } = req.body;
    const state = await State.create({ name });
    res
      .status(201)
      .json({ success: true, message: "State created", data: state });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
