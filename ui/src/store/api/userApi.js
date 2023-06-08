import axios from "axios";

// todo: get from env
const apiUrl = "http://localhost:3001";

export const fetchUsersApi = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`);
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

export const addToFavoritesApi = async (username, bookId, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/user/addToFavorites/${bookId}`,
      { username: username },
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

export const removeFromFavoritesApi = async (username, bookId, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/user/removeFromFavorites/${bookId}`,
      { username: username },
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
