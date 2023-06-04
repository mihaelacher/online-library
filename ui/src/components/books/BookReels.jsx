import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import BookCommentReel from "./BookCommentReel";
import BookRatingReel from "./BookRatingReel";
import { requestBookComment } from "../../store/mutations/commentMutations";

export const BookReels = ({ loggedUser, users, books, comments, ratings }) => {
  const [reelsElements, setReelsElements] = useState([]);

  useEffect(() => {
    if (loggedUser) {
      const sortedReelElements = [...ratings, ...comments].sort(function (
        x,
        y
      ) {
        return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1;
      });

      let userReelElements = [];
      sortedReelElements.forEach((element) => {
        if (loggedUser.following?.includes(element.username)) {
          if (element.hasOwnProperty("comment")) {
            element.isComment = true;
          } else {
            element.isRating = true;
          }
          userReelElements.push(element);
        }
      });

      setReelsElements(userReelElements);
    }
  }, [loggedUser, users, books, comments, ratings]);

  return (
    <div
      className="container"
      style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}
    >
      {reelsElements.map(function (element) {
        return element.isComment ? (
          <BookCommentReel
            comment={element}
            books={books}
            users={users}
            comments={comments}
            requestBookComment={requestBookComment}
          />
        ) : (
          <BookRatingReel rating={element} books={books} users={users} />
        );
      })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser,
    users: state.users,
    books: state.books,
    comments: state.comments,
    ratings: state.ratings,
  };
}

const mapDispatchToProps = {
  requestBookComment,
};

export default connect(mapStateToProps)(BookReels);
