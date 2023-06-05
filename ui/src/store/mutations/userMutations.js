export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";
export const REQUEST_FOLLOW_USER = "REQUEST_FOLLOW_USER";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILED = "FOLLOW_USER_FAILED";
export const REQUEST_UNFOLLOW_USER = "REQUEST_UNFOLLOW_USER";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILED = "UNFOLLOW_USER_FAILED";
export const FETCH_LOGGED_USER = "FETCH_LOGGED_USER";
export const FETCH_LOGGED_USER_SUCCESS = "FETCH_LOGGED_USER_SUCCESS";
export const REQUEST_ADD_TO_FAVORITES = "REQUEST_ADD_TO_FAVORITES";
export const ADD_TO_FAVORITES_SUCCESS = "ADD_TO_FAVORITES_SUCCESS";
export const ADD_TO_FAVORITES_FAILED = "ADD_TO_FAVORITES_FAILED";
export const REQUEST_REMOVE_FROM_FAVORITES = "REQUEST_REMOVE_FROM_FAVORITES";
export const REMOVE_FROM_FAVORITES_SUCCESS = "REMOVE_FROM_FAVORITES_SUCCESS";
export const REMOVE_FROM_FAVORITES_FAILED = "REMOVE_FROM_FAVORITES_FAILED";

export const fetchUsers = (loggedUser) => ({
  type: FETCH_USERS,
  loggedUser,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  users,
});

export const fetchUsersFailed = (errors) => ({
  type: FETCH_USERS_FAILED,
  errors,
});

export const requestFollowUser = (follower, following, token) => ({
  type: REQUEST_FOLLOW_USER,
  follower,
  following,
  token,
});

export const followUserSuccess = (follower, following) => ({
  type: FOLLOW_USER_SUCCESS,
  follower,
  following,
});

export const followUserFailed = (error) => ({
  type: FOLLOW_USER_FAILED,
  error,
});

export const requestUnfollowUser = (follower, following, token) => ({
  type: REQUEST_UNFOLLOW_USER,
  follower,
  following,
  token,
});

export const unfollowUserSuccess = (follower, following) => ({
  type: UNFOLLOW_USER_SUCCESS,
  follower,
  following,
});

export const unfollowUserFailed = (error) => ({
  type: UNFOLLOW_USER_FAILED,
  error,
});

export const fetchLoggedUser = (users, loggedUser) => ({
  type: FETCH_LOGGED_USER,
  users,
  loggedUser,
});

export const fetchLoggedUserSuccess = (user) => ({
  type: FETCH_LOGGED_USER_SUCCESS,
  user,
});

export const requestAddToFavorites = (username, bookId, token) => ({
  type: REQUEST_ADD_TO_FAVORITES,
  username,
  bookId,
  token,
});

export const addToFavoritesSuccess = (bookId) => ({
  type: ADD_TO_FAVORITES_SUCCESS,
  bookId,
});

export const addToFavoritesFailed = (error) => ({
  type: ADD_TO_FAVORITES_FAILED,
  error,
});

export const requestRemoveFromFavorites = (username, bookId, token) => ({
  type: REQUEST_REMOVE_FROM_FAVORITES,
  username,
  bookId,
  token,
});

export const removeFromFavoritesSuccess = (bookId) => ({
  type: REMOVE_FROM_FAVORITES_SUCCESS,
  bookId,
});

export const removeFromFavoritesFailed = (error) => ({
  type: REMOVE_FROM_FAVORITES_FAILED,
  error,
});
