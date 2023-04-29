export const FETCH_BOOKS = "FETCH_BOOKS";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILED = "FETCH_BOOKS_FAILED";
export const FETCH_SEARCH_BOOKS = "FETCH_SEARCH_BOOKS";
export const FETCH_SEARCH_BOOKS_SUCCESS = "FETCH_SEARCH_BOOKS_SUCCESS";
export const REQUEST_BOOK_CREATION = "REQUEST_BOOK_CREATION";
export const CREATE_BOOK = "CREATE_BOOK";
export const CREATE_BOOK_FAILED = "CREATE_BOOK_FAILED";
export const REQUEST_BOOK_UPDATE = "REQUEST_BOOK_UPDATE";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const UPDATE_BOOK_FAILED = "CREATE_BOOK_FAILED";
export const BEGIN_API_CALL = "BEGIN_API_CALL";

export const fetchBooks = (loggedUser) => ({
  type: FETCH_BOOKS,
  loggedUser,
});

export const fetchBooksSuccess = (books, loggedUser) => ({
  type: FETCH_BOOKS_SUCCESS,
  books,
  loggedUser,
});

export const fetchSearchBooks = (params) => ({
  type: FETCH_SEARCH_BOOKS,
  params,
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

export const createBook = (book) => ({
  type: CREATE_BOOK,
  book,
});

export const requestBookUpdate = (token, book) => ({
  type: REQUEST_BOOK_UPDATE,
  token,
  book,
});

export const updateBook = (book) => ({
  type: UPDATE_BOOK,
  book,
});

export const beginApiCall = () => ({
  type: BEGIN_API_CALL,
});

export const createBookFailed = (errors) => ({
  type: CREATE_BOOK_FAILED,
  errors,
});

export const updateBookFailed = (errors) => ({
  type: UPDATE_BOOK,
  errors,
});

export const fetchBooksFailed = (errors) => ({
  type: FETCH_BOOKS,
  errors,
});
