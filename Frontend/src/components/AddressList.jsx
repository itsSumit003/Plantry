import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  // Fetch saved addresses
  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/addresses");
      setAddresses(res.data);
    } catch (err) {
      console.log("Error fetching addresses", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Address
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        // UPDATE
        await axios.put(
          `http://localhost:3000/api/addresses/${editing}`,
          form
        );
      } else {
        // ADD NEW
        await axios.post("http://localhost:3000/api/addresses", form);
      }

      fetchAddresses();
      setShowForm(false);
      setEditing(null);

      setForm({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      });
    } catch (err) {
      console.log("Save failed", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/addresses/${id}`);
      fetchAddresses();
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <div>
      {/* Title + Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Saved Addresses</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
        >
          <FaPlus /> Add Address
        </button>
      </div>

      {/* Address Cards */}
      {addresses.length === 0 ? (
        <p className="text-gray-600">No addresses saved.</p>
      ) : (
        addresses.map((a) => (
          <div
            key={a.id}
            className="border p-4 rounded-lg mb-4 shadow-sm bg-gray-50"
          >
            <h3 className="font-bold text-lg">{a.name}</h3>
            <p>{a.address}</p>
            <p>
              {a.city}, {a.state} - {a.pincode}
            </p>
            <p className="text-gray-600 mt-1">Phone: {a.phone}</p>

            {/* Buttons */}
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => {
                  setEditing(a.id);
                  setForm(a);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => handleDelete(a.id)}
                className="flex items-center gap-2 text-red-600 hover:underline"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Address" : "Add Address"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />

              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              ></textarea>

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />

              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />

              <input
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />

              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="w-full bg-green-700 text-white p-2 rounded-lg"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="w-full bg-gray-300 text-black p-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressList;
