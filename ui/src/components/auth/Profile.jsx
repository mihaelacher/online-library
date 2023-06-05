import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import MyBookList from "../books/MyBookList";
import Loading from "../common/Loading";
import "./Profile.css";

const Profile = ({ loggedUser, books, loading }) => {
  const { user } = useAuth0();
  const [providedBooksCount, setProvidedBooksCount] = useState(0);

  useEffect(() => {
    if (loggedUser) {
      const providedBooks = Object.values(books)?.filter(
        (book) => book.provider === loggedUser?.username
      );
      setProvidedBooksCount(providedBooks?.length);
    }
  }, [loggedUser, books]);

  return (
    <div class="container">
      <div class="profile">
        <div class="profile-image">
          <img src={user.picture} alt="profilepic" />
        </div>

        <div class="profile-user-settings">
          <h1 class="profile-user-name">{user.nickname}</h1>
        </div>

        {!loading && (
          <div class="profile-stats">
            <ul>
              <li>
                <span class="profile-stat-count">{providedBooksCount}</span>{" "}
                книги
              </li>
              <li>
                <span class="profile-stat-count">
                  {loggedUser?.followers?.length}
                </span>{" "}
                последователи
              </li>
              <li>
                <span class="profile-stat-count">
                  {loggedUser?.following?.length}
                </span>{" "}
                следвам
              </li>
            </ul>
          </div>
        )}
      </div>
      <MyBookList loggedUser={loggedUser} books={books} loading={loading} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    books: state.books,
    loggedUser: state.loggedUser,
    loading: state.apiCallsInProgress > 0,
  };
}

export default withAuthenticationRequired(connect(mapStateToProps)(Profile), {
  onRedirecting: () => <Loading />,
});
