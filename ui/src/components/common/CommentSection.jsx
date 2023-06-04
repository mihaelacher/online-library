import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";

import Comment from "./Comment";

export const CommentSection = ({ bookId, comments, requestBookComment }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleCommentChange = (event) => {
    event.stopPropagation();
    setCommentText(event.target.value);
  };

  const handleKeyDown = async (event) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      postComment();
    }
  };

  const handlePostCommentClick = async (event) => {
    event.stopPropagation();
    postComment();
    setCommentText("");
  };

  const postComment = async () => {
    if (!commentText.length) {
      return;
    }
    const token = await getAccessTokenSilently();
    requestBookComment(user.nickname, bookId, commentText, token);
  };

  const handleEmojiClick = (emojiData) => {
    setCommentText(commentText + emojiData.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className="coment-bottom bg-white p-2 px-4">
      {isAuthenticated && (
        <div className="d-flex flex-row add-comment-section mt-4 mb-4">
          <img
            className="img-fluid img-responsive rounded-circle mr-5"
            src={user.picture}
            width="38"
            alt="profilepic"
          />
          <input
            onChange={handleCommentChange}
            onKeyDown={handleKeyDown}
            type="text"
            className="form-control mr-3"
            placeholder="Напиши коментар"
            value={commentText}
          />
          <div
            className="emoji-picker-toggle"
            style={{ marginLeft: "10px", marginTop: "2px", cursor: "pointer" }}
            onClick={toggleEmojiPicker}
          >
            <FontAwesomeIcon
              icon={faSmile}
              className={showEmojiPicker ? "active" : ""}
            />
          </div>
          {showEmojiPicker && (
            <div
              style={{ position: "absolute" }}
              className="emoji-picker-container"
            >
              <EmojiPicker
                emojiStyle="facebook"
                lazyLoadEmojis="true"
                searchDisabled="true"
                onEmojiClick={handleEmojiClick}
              />
            </div>
          )}
          <FontAwesomeIcon
            onClick={handlePostCommentClick}
            style={{ marginLeft: "10px", marginTop: "10px", cursor: "pointer" }}
            icon="fa-solid fa-paper-plane"
          />
        </div>
      )}
      <div className="commented-section mt-2">
        {comments?.map(function (comment, i) {
          return <Comment commentId={comment._id} />;
        })}
      </div>
    </div>
  );
};

export default CommentSection;
