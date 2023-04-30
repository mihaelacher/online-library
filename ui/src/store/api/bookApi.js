import axios from "axios";

// get from env
const apiUrl = "http://localhost:3001";

export const createBookApi = async (token, book) => {
  try {
    const { data } = await axios.post(`${apiUrl}/book`, book, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateBookApi = async (token, book) => {
  try {
    const response = await axios.post(`${apiUrl}/book/${book._id}`, book, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteBookApi = async (bookId, token, provider) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        provider,
      },
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchBooksApi = async () => {
  try {
    const response = await axios.get(`${apiUrl}/books`);
    return response.data.map((book) => ({
      id: book._id.toString(),
      ...book,
    }));
  } catch (error) {
    throw new Error(error);
  }
};
