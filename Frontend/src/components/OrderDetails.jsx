import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/orders/${orderId}`
      );
      setOrder(res.data);
    } catch (err) {
      console.log("Order fetch failed", err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div className="pt-4">
      <button
        onClick={() => navigate("/userprofile/orders")}
        className="mb-4 text-green-700 hover:underline"
      >
        ← Back to Orders
      </button>

      <div className="border rounded-xl p-6 shadow bg-white">
        {/* ORDER HEADER */}
        <h1 className="text-2xl font-bold mb-2">
          Order Details #{order.id}
        </h1>

        <p className="text-gray-600">
          Date: {new Date(order.createdAt).toLocaleDateString()}
        </p>

        <p className="text-green-700 font-semibold mt-1">
          Status: {order.status || "Placed"}
        </p>

        {/* ADDRESS SECTION */}
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-2">Delivery Address</h2>
          <div className="bg-gray-50 border p-4 rounded-lg">
            <p className="font-semibold">{order.address?.name}</p>
            <p>{order.address?.address}</p>
            <p>
              {order.address?.city}, {order.address?.state} -{" "}
              {order.address?.pincode}
            </p>
            <p className="mt-1 text-gray-600">
              Phone: {order.address?.phone}
            </p>
          </div>
        </div>

        {/* ITEMS SECTION */}
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-3">Order Items</h2>

          {order.items?.map((item) => (
            <div
              key={item.id}
              className="border-b py-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.productName}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
              </div>

              <p className="font-bold text-green-700">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* TOTAL PRICE */}
        <div className="mt-6 flex justify-between text-xl font-semibold">
          <span>Total Amount:</span>
          <span className="text-green-700">₹{order.totalAmount}</span>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/store")}
          className="w-full mt-6 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
