import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function useFetchData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (url) {
      setIsLoading(true);
      fetchData();
    }
  }, [url]);

  async function fetchData() {
    try {
      const token = isAuthenticated ? await getAccessTokenSilently() : "";
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }

  return { data, error, isLoading };
}

export default useFetchData;
