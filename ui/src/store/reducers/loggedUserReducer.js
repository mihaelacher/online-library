import * as mutations from "../mutations/userMutations";
import { initialState } from "../initialState";

export const loggedUser = (loggedUser = initialState.loggedUser, action) => {
  switch (action.type) {
    case mutations.FETCH_LOGGED_USER_SUCCESS:
      return action.user;
    default:
      return loggedUser;
  }
};
