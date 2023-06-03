import * as mutations from "../mutations/commentMutations";
import { initialState } from "../initialState";

export const comments = (state = initialState.comments, action) => {
  switch (action.type) {
    case mutations.FETCH_COMMENTS_SUCCESS:
      return action.comments;
    case mutations.BOOK_COMMENT_SUCCESS:
      return [...state, action.comment];
    case mutations.BOOK_COMMENT_LIKE_SUCCESS:
      return state.map((comment) =>
        comment._id === action.commentId
          ? { ...comment, likes: [...comment.likes, action.username] }
          : comment
      );
    case mutations.BOOK_COMMENT_DISLIKE_SUCCESS:
      return state.map((comment) =>
        comment._id === action.commentId
          ? { ...comment, likes: [...comment.dislikes, action.username] }
          : comment
      );
    default:
      return state;
  }
};
