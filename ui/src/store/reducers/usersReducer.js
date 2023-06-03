import * as mutations from "../mutations/userMutations";
import { initialState } from "../initialState";
import { unsetArrElement } from "../../utils/common/arrUtil";

export const users = (users = initialState.users, action) => {
  switch (action.type) {
    case mutations.FETCH_USERS_SUCCESS:
      return action.users?.reduce((obj, user) => {
        return Object.assign(obj, {
          [user.username]: user,
        });
      }, {});
    case mutations.FOLLOW_USER_SUCCESS:
      return users.map((user) =>
        user.username === action.following
          ? { ...user, followers: [...user.followers, action.follower] }
          : user
      );
    case mutations.UNFOLLOW_USER_SUCCESS:
      return users.map((user) =>
        user.username === action.following
          ? {
              ...user,
              followers: unsetArrElement(action.follower, user.followers),
            }
          : user
      );
    default:
      return users;
  }
};
