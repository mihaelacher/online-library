import { all, call, put, takeEvery } from "redux-saga/effects";

import * as userMutations from "../mutations/userMutations";
import { beginApiCall } from "../mutations/apiMutations";
import * as api from "../api/userApi";

export function* watchUsersSagas() {
  yield all([takeEvery(userMutations.FETCH_USERS, fetchUsersSaga)]);
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
