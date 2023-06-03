export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_FAILED = "FETCH_COMMENTS_FAILED";
export const REQUEST_BOOK_COMMENT = "REQUEST_BOOK_COMMENT";
export const BOOK_COMMENT_SUCCESS = "BOOK_COMMENT_SUCCESS";
export const BOOK_COMMENT_FAILED = "BOOK_COMMENT_FAILED";
export const REQUEST_BOOK_COMMENT_LIKE = "REQUEST_BOOK_COMMENT_LIKE";
export const BOOK_COMMENT_LIKE_SUCCESS = "BOOK_COMMENT_LIKE_SUCCESS";
export const BOOK_COMMENT_LIKE_FAILED = "BOOK_COMMENT_LIKE_FAILED";
export const REQUEST_BOOK_COMMENT_DISLIKE = "REQUEST_BOOK_COMMENT_DISLIKE";
export const BOOK_COMMENT_DISLIKE_SUCCESS = "BOOK_COMMENT_DISLIKE_SUCCESS";
export const BOOK_COMMENT_DISLIKE_FAILED = "BOOK_COMMENT_DISLIKE_FAILED";

export const fetchComments = () => ({
  type: FETCH_COMMENTS,
});

export const fetchCommentsSuccess = (comments) => ({
  type: FETCH_COMMENTS_SUCCESS,
  comments,
});

export const fetchCommentsFailed = (errors) => ({
  type: FETCH_COMMENTS_FAILED,
  errors,
});

export const requestBookComment = (username, bookId, commentText, token) => ({
  type: REQUEST_BOOK_COMMENT,
  username,
  bookId,
  commentText,
  token,
});

export const bookCommentSuccess = (
  username,
  bookId,
  commentText,
  timestamp
) => ({
  type: BOOK_COMMENT_SUCCESS,
  username,
  bookId,
  commentText,
  timestamp,
});

export const bookCommentFailed = (error) => ({
  type: BOOK_COMMENT_FAILED,
  error,
});

export const requestBookCommentLike = (commentId, username, token) => ({
  type: REQUEST_BOOK_COMMENT_LIKE,
  commentId,
  username,
  token,
});

export const bookCommentLikeSuccess = (commentId, username) => ({
  type: BOOK_COMMENT_LIKE_SUCCESS,
  commentId,
  username,
});

export const bookCommentLikeFailed = (error) => ({
  type: BOOK_COMMENT_LIKE_FAILED,
  error,
});

export const requestBookCommentDislike = (commentId, username, token) => ({
  type: REQUEST_BOOK_COMMENT_DISLIKE,
  commentId,
  username,
  token,
});

export const bookCommentDislikeSuccess = (commentId, username) => ({
  type: BOOK_COMMENT_DISLIKE_SUCCESS,
  commentId,
  username,
});

export const bookCommentDislikeFailed = (error) => ({
  type: BOOK_COMMENT_DISLIKE_FAILED,
  error,
});
