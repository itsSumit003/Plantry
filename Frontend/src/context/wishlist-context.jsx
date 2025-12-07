import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from API
  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/watchlist");
      setWatchlist(res.data.items);
    } catch (err) {
      console.log("Error fetching watchlist", err);
    }
  };

  const addToWatchlist = async (productId) => {
    try {
      const res = await axios.post("http://localhost:3000/api/watchlist", {
        productId,
      });

      toast.success("Added to Watchlist");
      setWatchlist(res.data.items);
    } catch (err) {
      toast.error("Failed to add!");
    }
  };

  const removeFromWatchlist = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/watchlist/${id}`);

      toast.success("Removed from Watchlist");
      setWatchlist(res.data.items);
    } catch (err) {
      toast.error("Failed to remove!");
    }
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
