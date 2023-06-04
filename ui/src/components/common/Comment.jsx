import React from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getTimeDifference } from "../../utils/common/timeUtil";
import {
  requestBookCommentLike,
  requestBookCommentDislike,
  requestBookCommentUnlike,
  requestBookCommentUndislike,
} from "../../store/mutations/commentMutations";

export const Comment = ({
  commentId,
  comment,
  pic,
  requestBookCommentDislike,
  requestBookCommentLike,
  requestBookCommentUnlike,
  requestBookCommentUndislike,
}) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const likeComment = async (e) => {
    e.stopPropagation();
    const token = await getAccessTokenSilently();
    if (comment.likes.includes(user.nickname)) {
      requestBookCommentUnlike(commentId, user.nickname, token);
    } else {
      requestBookCommentLike(commentId, user.nickname, token);
    }
  };

  const disLikeComment = async (e) => {
    e.stopPropagation();
    const token = await getAccessTokenSilently();
    if (!comment.dislikes.includes(user.nickname)) {
      requestBookCommentDislike(commentId, user.nickname, token);
    } else {
      requestBookCommentUndislike(commentId, user.nickname, token);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <div class="d-flex flex-row align-items-center commented-user">
          <img
            class="img-fluid img-responsive rounded-circle mr-2"
            src={pic}
            width="38"
            alt="userpic"
          />
          <h5 class="mr-2">{comment?.username}</h5>
          <span style={{ marginLeft: "5px" }}>
            {getTimeDifference(comment?.timestamp)}
          </span>
        </div>
        <div class="comment-text-sm">
          <span>{comment?.comment}</span>
        </div>
        <div class="reply-section">
          <div class="d-flex flex-row align-items-center">
            {isAuthenticated && (
              <>
                <FontAwesomeIcon
                  onClick={likeComment}
                  icon="fa-solid fa-heart"
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                />
                <FontAwesomeIcon
                  onClick={disLikeComment}
                  icon="fa-solid fa-heart-crack"
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                />
              </>
            )}
            <span style={{ marginLeft: "10px" }}>
              {comment?.likes?.length - comment?.dislikes?.length ?? 0}{" "}
              харесвания
            </span>
            {isAuthenticated && (
              <h6 style={{ marginLeft: "15px", cursor: "pointer" }}>
                Коментирай
              </h6>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state, ownProps) {
  const { comments, users } = state;
  const { commentId } = ownProps;

  const comment = comments.find((comment) => comment._id === commentId);
  const pic = users[comment.username]?.pic || "";

  return {
    comment,
    pic,
  };
}

const mapDispatchToProps = {
  requestBookCommentLike,
  requestBookCommentDislike,
  requestBookCommentUnlike,
  requestBookCommentUndislike,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
