import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Comment from "./Comment";

export const CommentSection = ({
  bookId,
  loading,
  comments,
  users,
  requestBookComment,
}) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [commentText, setCommentText] = useState("");
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      postComment();
    }
  };

  const postComment = async () => {
    if (!commentText.length) {
      return;
    }
    const token = await getAccessTokenSilently();
    requestBookComment(user.nickname, bookId, commentText, token);
  };

  return (
    <div class="coment-bottom bg-white p-2 px-4">
      {isAuthenticated && (
        <div class="d-flex flex-row add-comment-section mt-4 mb-4">
          <img
            class="img-fluid img-responsive rounded-circle mr-5"
            src={user.picture}
            width="38"
            alt="profilepic"
          />
          <input
            onChange={handleCommentChange}
            onKeyDown={handleKeyDown}
            type="text"
            class="form-control mr-3"
            placeholder="Напиши коментар"
          />
          <FontAwesomeIcon
            onClick={postComment}
            style={{ marginLeft: "10px", marginTop: "10px", cursor: "pointer" }}
            icon="fa-solid fa-paper-plane"
          />
        </div>
      )}
      <div class="commented-section mt-2">
        {comments?.map(function (comment, i) {
          return (
            <Comment
              key={comment._id}
              commentId={comment._id}
              pic={users[comment.username].pic}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
