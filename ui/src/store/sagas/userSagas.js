import { all, call, put, takeEvery } from "redux-saga/effects";

import * as userMutations from "../mutations/userMutations";
import { fetchRatings } from "../mutations/ratingMutations";
import { beginApiCall } from "../mutations/apiMutations";
import * as api from "../api/userApi";

export function* watchUsersSagas() {
  yield all([
    takeEvery(userMutations.FETCH_USERS, fetchUsersSaga),
    takeEvery(userMutations.REQUEST_FOLLOW_USER, followUserSaga),
    takeEvery(userMutations.REQUEST_UNFOLLOW_USER, unfollowUserSaga),
    takeEvery(userMutations.FETCH_LOGGED_USER, fetchLoggedUserSaga),
    takeEvery(userMutations.REQUEST_ADD_TO_FAVORITES, addToFavorites),
    takeEvery(userMutations.REQUEST_REMOVE_FROM_FAVORITES, removeFromFavorites),
  ]);
}

export function* fetchUsersSaga(action) {
  const { loggedUser } = action;
  yield put(beginApiCall());
  try {
    const data = yield call(api.fetchUsersApi);
    yield put(userMutations.fetchUsersSuccess(data));
    yield call(fetchLoggedUserSaga, data, loggedUser);
  } catch (error) {
    yield put(userMutations.fetchUsersFailed(error.message));
  }
}

export function* fetchLoggedUserSaga(users, loggedUser) {
  const user = users.filter((item) => item.username === loggedUser?.nickname);
  if (user.length) {
    const loggedUser = user.shift();
    yield put(userMutations.fetchLoggedUserSuccess(loggedUser));
  }
  yield put(fetchRatings(loggedUser));
}

export function* followUserSaga(action) {
  const { follower, following, token } = action;
  yield put(beginApiCall());
  try {
    yield call(api.followUserApi, follower, following, token);
    yield put(userMutations.followUserSuccess(follower, following));
  } catch (error) {
    yield put(userMutations.followUserFailed(error.message));
  }
}

export function* unfollowUserSaga(action) {
  const { follower, following, token } = action;
  yield put(beginApiCall());
  try {
    yield call(api.unfollowUserApi, follower, following, token);
    yield put(userMutations.unfollowUserSuccess(follower, following));
  } catch (error) {
    yield put(userMutations.unfollowUserFailed(error.message));
  }
}

export function* addToFavorites(action) {
  const { username, bookId, token } = action;
  try {
    yield call(api.addToFavoritesApi, username, bookId, token);
    yield put(userMutations.addToFavoritesSuccess(bookId));
  } catch (error) {
    yield put(userMutations.addToFavoritesFailed(error.message));
  }
}

export function* removeFromFavorites(action) {
  const { username, bookId, token } = action;
  try {
    yield call(api.removeFromFavoritesApi, username, bookId, token);
    yield put(userMutations.removeFromFavoritesSuccess(bookId));
  } catch (error) {
    yield put(userMutations.removeFromFavoritesFailed(error.message));
  }
}
