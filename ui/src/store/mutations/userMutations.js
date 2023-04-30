export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

export const fetchUsers = (token) => ({
  type: FETCH_USERS,
  token,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  users,
});

export const fetchUsersFailed = (errors) => ({
  type: FETCH_USERS_FAILED,
  errors,
});
