import React from "react";
import { useWatchlist } from "../context/watchlist-context.jsx";
import { FaHeartBroken } from "react-icons/fa";

const WatchlistCard = ({ item }) => {
  const { removeFromWatchlist } = useWatchlist();

  return (
    <div className="flex justify-between items-center border rounded-lg p-4 shadow-sm mb-4 bg-white">

      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
        />

        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-green-700 font-bold">₹{item.price}</p>
        </div>
      </div>

      <button
        onClick={() => removeFromWatchlist(item.id)}
        className="flex items-center gap-2 text-red-600 border border-red-400 px-3 py-1 rounded-md hover:bg-red-50 transition"
      >
        <FaHeartBroken /> Remove
      </button>
    </div>
  );
};

export default WatchlistCard;
