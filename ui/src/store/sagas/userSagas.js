import { all, call, put, takeEvery } from "redux-saga/effects";

import * as userMutations from "../mutations/userMutations";
import { beginApiCall } from "../mutations/apiMutations";
import * as api from "../api/userApi";

export function* watchUsersSagas() {
  yield all([
    takeEvery(userMutations.FETCH_USERS, fetchUsersSaga),
    takeEvery(userMutations.REQUEST_FOLLOW_USER, followUserSaga),
    takeEvery(userMutations.REQUEST_UNFOLLOW_USER, unfollowUserSaga),
  ]);
}

export function* fetchUsersSaga(action) {
  const { token } = action;
  yield put(beginApiCall());
  try {
    const data = yield call(api.fetchUsersApi, token);
    yield put(userMutations.fetchUsersSuccess(data));
  } catch (error) {
    yield put(userMutations.fetchUsersFailed(error.message));
  }
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
