import { all, call, put, takeEvery } from "redux-saga/effects";

import * as commentMutations from "../mutations/commentMutations";
import { beginApiCall } from "../mutations/apiMutations";
import * as api from "../api/commentApi";

export function* watchCommentsSagas() {
  yield all([
    takeEvery(commentMutations.FETCH_COMMENTS, fetchCommentsSaga),
    takeEvery(commentMutations.REQUEST_BOOK_COMMENT, bookCommentSaga),
    takeEvery(commentMutations.REQUEST_BOOK_COMMENT_LIKE, likeBookCommentSaga),
    takeEvery(
      commentMutations.REQUEST_BOOK_COMMENT_DISLIKE,
      dislikeBookCommentSaga
    ),
    takeEvery(
      commentMutations.REQUEST_BOOK_COMMENT_UNLIKE,
      unlikeBookCommentSaga
    ),
    takeEvery(
      commentMutations.REQUEST_BOOK_COMMENT_UNDISLIKE,
      undislikeBookCommentSaga
    ),
  ]);
}

export function* fetchCommentsSaga() {
  yield put(beginApiCall());
  try {
    const data = yield call(api.fetchCommentsApi);
    console.log(data);
    yield put(commentMutations.fetchCommentsSuccess(data));
  } catch (error) {
    yield put(commentMutations.fetchCommentsFailed(error.message));
  }
}

export function* bookCommentSaga(action) {
  const { username, bookId, commentText, token } = action;
  try {
    const timestamp = new Date();
    yield call(
      api.commentBookApi,
      username,
      bookId,
      commentText,
      timestamp,
      token
    );
    yield put(
      commentMutations.bookCommentSuccess(
        username,
        bookId,
        commentText,
        timestamp
      )
    );
  } catch (error) {
    yield put(commentMutations.bookCommentFailed(error.message));
  }
}

export function* likeBookCommentSaga(action) {
  const { username, commentId, token } = action;
  try {
    yield call(api.likeCommentApi, username, commentId, token);
    yield put(commentMutations.bookCommentLikeSuccess(commentId, username));
  } catch (error) {
    yield put(commentMutations.bookCommentLikeFailed(error.message));
  }
}

export function* unlikeBookCommentSaga(action) {
  const { username, commentId, token } = action;
  try {
    yield call(api.unlikeCommentApi, username, commentId, token);
    yield put(commentMutations.bookCommentUnlikeSuccess(commentId, username));
  } catch (error) {
    yield put(commentMutations.bookCommentUnlikeFailed(error.message));
  }
}

export function* dislikeBookCommentSaga(action) {
  const { username, commentId, token } = action;
  try {
    yield call(api.dislikeCommentApi, username, commentId, token);
    yield put(commentMutations.bookCommentDislikeSuccess(commentId, username));
  } catch (error) {
    yield put(commentMutations.bookCommentDislikeFailed(error.message));
  }
}

export function* undislikeBookCommentSaga(action) {
  const { username, commentId, token } = action;
  try {
    yield call(api.undislikeCommentApi, username, commentId, token);
    yield put(
      commentMutations.bookCommentUndislikeSuccess(commentId, username)
    );
  } catch (error) {
    yield put(commentMutations.bookCommentUndislikeFailed(error.message));
  }
}
