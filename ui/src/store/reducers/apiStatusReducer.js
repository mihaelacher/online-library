import * as mutations from "../mutations";
import { initialState } from "../initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 7) === "SUCCESS";
}

function actionTypeEndsInFailed(type) {
  return type.substring(type.length - 6) === "FAILED";
}

export const apiCallsInProgress = (
  apiCallsInProgress = initialState.apiCallsInProgress,
  action
) => {
  if (action.type === mutations.BEGIN_API_CALL) {
    return ++apiCallsInProgress;
  }

  if (
    actionTypeEndsInSuccess(action.type) ||
    actionTypeEndsInFailed(action.type)
  ) {
    return apiCallsInProgress > 0 ? --apiCallsInProgress : apiCallsInProgress;
  }

  return apiCallsInProgress;
};
