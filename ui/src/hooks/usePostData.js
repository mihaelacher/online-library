import axios from "axios";
import { useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const usePostData = ({ url, headers = {}, body = {} }) => {
  const [res, setRes] = useState({ data: {}, error: null, isLoading: false });
  const { getAccessTokenSilently } = useAuth0();

  const callApi = useCallback(async (params) => {
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    const token = await getAccessTokenSilently();
    try {
      headers["Authorization"] = `Bearer ${token}`;

      const response = await axios.post(url, params, { headers: headers });
      setRes({ data: response.data, isLoading: false, error: null });
    } catch (error) {
      setRes({ data: {}, isLoading: false, error });
    }
  }, []);
  return { res, callApi };
};

export default usePostData;
