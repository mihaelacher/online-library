import axios from "axios";

// todo: get from env
const apiUrl = "http://localhost:3001";

export const fetchCommentsApi = async () => {
  try {
    const response = await axios.get(`${apiUrl}/comments`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const commentBookApi = async (
  username,
  bookId,
  commentText,
  timestamp,
  token
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/comment/${username}`,
      { bookId: bookId, commentText: commentText, timestamp: timestamp },
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

export const likeCommentApi = async (username, commentId, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/comment/like/${commentId}`,
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

export const unlikeCommentApi = async (username, commentId, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/comment/unlike/${commentId}`,
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

export const dislikeCommentApi = async (username, commentId, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/comment/dislike/${commentId}`,
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

export const undislikeCommentApi = async (username, commentId, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/comment/undislike/${commentId}`,
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
