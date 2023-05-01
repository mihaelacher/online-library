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

export const fetchUsers = (token, loggedUser) => ({
  type: FETCH_USERS,
  token,
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
