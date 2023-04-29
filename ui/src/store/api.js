import axios from "axios";

const apiUrl = "http://localhost:3001";

export const createBookApi = async (token, book) => {
  const { data } = await axios.post(`${apiUrl}/book`, book, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateBookApi = async (token, book) => {
  const response = await axios.post(`${apiUrl}/book/${book._id}`, book, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fetchBooksApi = async () => {
  const response = await axios.get(`${apiUrl}/books`);
  return response.data.map((book) => ({
    id: book._id.toString(),
    ...book,
  }));
};
