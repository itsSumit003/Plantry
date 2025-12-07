import { useEffect, useState } from "react";

export default function useFetch(apiFunc) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFunc().then((res) => {
      setData(res.data.data || res.data);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
