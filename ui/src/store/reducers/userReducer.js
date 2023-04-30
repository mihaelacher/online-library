import * as mutations from "../mutations/userMutations";
import { initialState } from "../initialState";

export const users = (users = initialState.users, action) => {
  switch (action.type) {
    case mutations.FETCH_USERS_SUCCESS:
      return action.users;
    default:
      return users;
  }
};
