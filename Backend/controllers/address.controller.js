import Address from "../models/Address.js";
import State from "../models/State.js";
import City from "../models/City.js";

export const addAddress = async (req, res) => {
  try {
    const {
      user_id,
      full_name,
      mobile,
      address_line1,
      address_line2,
      state_id,
      city_id,
      pincode,
      address_type,
      is_default,
    } = req.body;

    // Logged in user mismatch check
    if (req.user && parseInt(req.user.id) !== parseInt(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You cannot add an address for another user.",
      });
    }

    // Validate State exists
    const state = await State.findByPk(state_id);
    if (!state) {
      return res.status(404).json({
        success: false,
        message: "State not found.",
      });
    }

    // Validate City exists
    const city = await City.findByPk(city_id);
    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found.",
      });
    }

    // If user sets address as default -> remove previous default flags
    if (is_default) {
      await Address.update({ is_default: false }, { where: { user_id } });
    }

    const address = await Address.create({
      user_id,
      full_name,
      mobile,
      address_line1,
      address_line2,
      state_id,
      city_id,
      pincode,
      address_type,
      is_default,
    });

    return res.status(201).json({
      success: true,
      message: "Address created successfully.",
      data: address,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

export const getAddressesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Prevent access to other users' data
    if (req.user && parseInt(req.user.id) !== parseInt(user_id)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view another user's addresses.",
      });
    }

    const addresses = await Address.findAll({
      where: { user_id },
      include: [
        { model: State, attributes: ["id", "name"] },
        { model: City, attributes: ["id", "name"] },
      ],
    });

    return res.json({
      success: true,
      message: "Addresses loaded successfully.",
      data: addresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};
