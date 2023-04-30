import axios from "axios";

// todo: get from env
const apiUrl = "http://localhost:3001";

export const fetchUsersApi = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
