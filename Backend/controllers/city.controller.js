import City from "../models/City.js";
import State from "../models/State.js";

export const getCitiesByState = async (req, res) => {
  try {
    const { state_id } = req.params;
    const state = await State.findByPk(state_id);
    if (!state)
      return res
        .status(404)
        .json({ success: false, message: "State not found" });

    const cities = await City.findAll({ where: { state_id, status: true } });
    res.json({ success: true, message: "Cities fetched", data: cities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createCity = async (req, res) => {
  try {
    const { state_id, name } = req.body;
    const city = await City.create({ state_id, name });
    res
      .status(201)
      .json({ success: true, message: "City created", data: city });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
