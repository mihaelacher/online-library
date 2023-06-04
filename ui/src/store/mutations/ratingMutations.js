export const FETCH_RATINGS = "FETCH_RATINGS";
export const FETCH_RATINGS_SUCCESS = "FETCH_RATINGS_SUCCESS";
export const FETCH_RATINGS_FAILED = "FETCH_RATINGS_FAILED";
export const REQUEST_BOOK_RATING = "REQUEST_BOOK_RATING";
export const BOOK_RATING_SUCCESS = "BOOK_RATING_SUCCESS";
export const BOOK_RATING_FAILED = "BOOK_RATING_FAILED";

export const fetchRatings = () => ({
  type: FETCH_RATINGS,
});

export const fetchRatingsSuccess = (ratings) => ({
  type: FETCH_RATINGS_SUCCESS,
  ratings,
});

export const fetchRatingsFailed = (errors) => ({
  type: FETCH_RATINGS_FAILED,
  errors,
});

export const requestBookRating = (username, bookId, value, token) => ({
  type: REQUEST_BOOK_RATING,
  username,
  bookId,
  value,
  token,
});

export const bookRatingSuccess = (username, bookId, value, timestamp) => ({
  type: BOOK_RATING_SUCCESS,
  username,
  bookId,
  value,
  timestamp,
});

export const bookRatingFailed = (error) => ({
  type: BOOK_RATING_FAILED,
  error,
});
