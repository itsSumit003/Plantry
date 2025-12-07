import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            onClick={() => navigate(`/userprofile/orders/${order.id}`)}
            className="border p-4 rounded-lg mb-4 shadow-sm bg-gray-50 cursor-pointer hover:shadow-md transition"
          >
            <h3 className="font-bold">Order #{order.id}</h3>

            <p className="text-green-700 font-semibold">
              Total Amount: ₹{order.totalAmount}
            </p>

            <p className="text-gray-600 mt-2">
              Items: {order.items?.length}
            </p>

            <p className="text-gray-500 mt-1">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
