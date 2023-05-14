export const FETCH_BOOKS = "FETCH_BOOKS";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILED = "FETCH_BOOKS_FAILED";
export const FETCH_SEARCH_BOOKS = "FETCH_SEARCH_BOOKS";
export const FETCH_SEARCH_BOOKS_SUCCESS = "FETCH_SEARCH_BOOKS_SUCCESS";
export const REQUEST_BOOK_CREATION = "REQUEST_BOOK_CREATION";
export const CREATE_BOOK_SUCCESS = "CREATE_BOOK_SUCCESS";
export const CREATE_BOOK_FAILED = "CREATE_BOOK_FAILED";
export const REQUEST_BOOK_UPDATE = "REQUEST_BOOK_UPDATE";
export const UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS";
export const UPDATE_BOOK_FAILED = "CREATE_BOOK_FAILED";
export const REQUEST_BOOK_DELETE = "REQUEST_BOOK_DELETE";
export const DELETE_BOOK_SUCCESS = "DELETE_BOOK_SUCCESS";
export const DELETE_BOOK_FAILED = "DELETE_BOOK_FAILED";

export const fetchBooks = (loggedUser) => ({
  type: FETCH_BOOKS,
  loggedUser,
});

export const fetchBooksSuccess = (books, loggedUser) => ({
  type: FETCH_BOOKS_SUCCESS,
  books,
  loggedUser,
});

export const fetchBooksFailed = (errors) => ({
  type: FETCH_BOOKS_FAILED,
  errors,
});

export const fetchSearchBooks = (searchText) => ({
  type: FETCH_SEARCH_BOOKS,
  searchText,
});

export const fetchSearchBooksSuccess = (searchBooks) => ({
  type: FETCH_SEARCH_BOOKS_SUCCESS,
  searchBooks,
});

export const requestBookCreation = (token, provider, book) => ({
  type: REQUEST_BOOK_CREATION,
  token,
  provider,
  book,
});

export const createBookSuccess = (book) => ({
  type: CREATE_BOOK_SUCCESS,
  book,
});

export const createBookFailed = (errors) => ({
  type: CREATE_BOOK_FAILED,
  errors,
});

export const requestBookUpdate = (token, book) => ({
  type: REQUEST_BOOK_UPDATE,
  token,
  book,
});

export const updateBookSuccess = (book) => ({
  type: UPDATE_BOOK_SUCCESS,
  book,
});

export const updateBookFailed = (errors) => ({
  type: UPDATE_BOOK_FAILED,
  errors,
});

export const requestBookDelete = (bookId, token, provider) => ({
  type: REQUEST_BOOK_DELETE,
  bookId,
  token,
  provider,
});

export const deleteBookSuccess = (bookId) => ({
  type: DELETE_BOOK_SUCCESS,
  bookId,
});

export const deleteBookFailed = (error) => ({
  type: DELETE_BOOK_FAILED,
  error,
});
