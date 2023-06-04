import { all, call, put, takeEvery } from "redux-saga/effects";

import * as ratingMutations from "../mutations/ratingMutations";
import { beginApiCall } from "../mutations/apiMutations";
import * as api from "../api/ratingApi";

export function* watchRatingsSagas() {
  yield all([
    takeEvery(ratingMutations.FETCH_RATINGS, fetchRatingsSaga),
    takeEvery(ratingMutations.REQUEST_BOOK_RATING, bookRatingSaga),
  ]);
}

export function* fetchRatingsSaga() {
  yield put(beginApiCall());
  try {
    const data = yield call(api.fetchRatingsApi);
    yield put(ratingMutations.fetchRatingsSuccess(data));
  } catch (error) {
    yield put(ratingMutations.fetchRatingsFailed(error.message));
  }
}

export function* bookRatingSaga(action) {
  const { username, bookId, value, token } = action;
  try {
    const timestamp = new Date();
    yield call(api.rateBookApi, username, bookId, value, timestamp, token);
    yield put(
      ratingMutations.bookRatingSuccess(username, bookId, value, timestamp)
    );
  } catch (error) {
    yield put(ratingMutations.bookRatingFailed(error.message));
  }
}
