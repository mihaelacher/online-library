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

export const followUserApi = async (follower, following, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/user/follow/${following}`,
      { follower: follower },
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

export const unfollowUserApi = async (follower, following, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/user/unfollow/${following}`,
      { follower: follower },
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
