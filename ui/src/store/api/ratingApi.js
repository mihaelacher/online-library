import axios from "axios";

// todo: get from env
const apiUrl = "http://localhost:3001";

export const fetchRatingsApi = async () => {
  try {
    const response = await axios.get(`${apiUrl}/ratings`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const rateBookApi = async (
  username,
  bookId,
  value,
  timestamp,
  token
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/rating/${bookId}`,
      { username: username, value: value, timestamp: timestamp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
